import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../App";
import { currentMessages, readingText1 } from "../../firebase";
import { Message } from "./message";
import './chat.css'
import { useDarkModeMessage } from "../../hooks/useDarkModeMessage";
import send from './../../img/send.png'
import smile from './../../img/smile.png'
import { memo } from "react";
import EmojiPicker from "emoji-picker-react";
import { Close, CloseV2 } from "../../UI/close/close";


export const Chat = memo(({ CurrentGroup }) => {

	const { userAcc, group, isLoading, setIsLoading } = useContext(Context)
	const [emojiActive, setEmodjiActive] = useState(false)
	const messagesEndRef = useRef(null);
	const inputFocus = useRef(null)
	const [chosenEmoji, setChosenEmoji] = useState(null);

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setMessage(message => message + emojiObject.emoji)
	};

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	};

	const [message, setMessage] = useState('')

	function handleSubmit() {
		currentMessages(CurrentGroup, userAcc, message)
		setEmodjiActive(false)
		setMessage('')
	}


	const [messages, setMessages] = useState([])
	async function getAllMessages() {
		setIsLoading(true)
		await readingText1(group, setMessages, messages)
		setIsLoading(false)
	}
	useEffect(() => {
		getAllMessages()
		inputFocus.current.focus()
	}, [CurrentGroup])


	useEffect(() => {
		const listener = event => {
			if (event.code === "Enter" || event.code === "NumpadEnter") {
				event.preventDefault();
				handleSubmit()
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [message]);

	useEffect(scrollToBottom, [messages]);
	useDarkModeMessage()


	const list_mes = messages.map(mes => <Message key={mes.createAt} data={mes} />)
	if (isLoading) return (<div>Loading...</div>); else {
		return (
			<main>
				<header>
					<CloseV2 />
					<div style={{ textAlign: 'center', fontSize: "20px", fontWeight: '500', margin: '0 70px' }}>
						<span>{`${group}`}</span>
					</div>
				</header>
				<div className="main_part">
					<ul id="chat">
						{list_mes.length>0?list_mes:<div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%)', textAlign:'center'}}>{'Chat is empty :('}</div>}
						<div ref={messagesEndRef}></div>
						{emojiActive ?
							<div className="emoji_class">
								<EmojiPicker onEmojiClick={onEmojiClick} disableSearchBar={true} />
							</div>
							: null}
					</ul>

					<footer>
						<div className="keyboard">
							<textarea ref={inputFocus} onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Type your message" autoComplete="off"></textarea>
							<img src={smile} onClick={() => setEmodjiActive(emojiActive => !emojiActive)} alt="" />
						</div>

						<div className="cycle_send" >

							<img src={send} onClick={message.length == 0 ? null : handleSubmit} />

						</div>
					</footer>
				</div>

			</main>
		)
	}

})