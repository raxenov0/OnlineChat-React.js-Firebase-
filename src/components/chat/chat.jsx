import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../App";
import { currentMessages ,readingText1 } from "../../firebase";
import { Message } from "./message";
import { useParams } from "react-router-dom";
import './chat.css'
import { useDarkModeMessage } from "../../hooks/useDarkModeMessage";
import send from './../../img/send.png'


export const Chat = () =>{

const name = useParams()
const {userAcc, group, isLoading, setIsLoading} = useContext(Context)

const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
const [message, setMessage] = useState('')

function handleSubmit(){

	currentMessages(group, userAcc, message)
	setMessage('')

}

function compareNumbers(a,b){
	return a.createAt-b.createAt
}
 
const [messages, setMessages] = useState([])

useEffect(()=>{
	setIsLoading(true)
	readingText1(group, setMessages, messages)
	setIsLoading(false)
} 

, [])
useEffect(scrollToBottom, [messages]);
useDarkModeMessage()


const list_mes = messages.map(mes=> <Message key={mes.createAt} data={mes}/>)
 if(isLoading) return(<div>Loading...</div>); else {
	return(
		<main>
			<header>
				<div>
						<h2 style={{textAlign:'center'}}>{`Chat: ${group}`}</h2>
						<h3>already 1902 messages</h3>
					</div>
			</header>
			<ul id="chat">
				{list_mes}
				<div ref={messagesEndRef}></div>
			</ul>
			<footer>
				<textarea onChange={(e)=> setMessage(e.target.value)} value={message} placeholder="Type your message"></textarea>
				<img src={send} onClick={()=>handleSubmit()}/>
			</footer>
	</main>    
    )
 }
    
}