import React, { useState, useEffect, useContext } from "react";
import { Header } from "../../UI/header";
import { Window } from "./window";
import {getGroups} from './../../firebase'
import './selectChat.css'
import Element from './element'
import { Context } from "../../App";
import { useDarkModeMain } from "../../hooks/useDarkModeMain";




export const SelectChat = () =>{
    let list = []
    const [create, setCreate] = useState(false)
    const [listGroups, setListGroups] = useState(list)
    const [currentList, setCurrentList] = useState([])
    const [search, setSearch] = useState('')
    const {userAcc, isLoading, setIsLoading} = useContext(Context)
    

    async function getAllGroupsMessages() {
        setIsLoading(true)
        const groups = await getGroups()
        list = []
        groups.forEach((doc)=>{list.push(doc.data())})
        setListGroups(list.sort((a,b)=>{return b.createAt - a.createAt}))
        setIsLoading(false)  
    }
    
    let current_list = []

    function changeSearch(e){
        setSearch(e.target.value)
        if(e.target.value.length !== 0) {
            current_list = listGroups.filter((gr)=> {return gr.group.toLowerCase().includes(e.target.value.toLowerCase())});
            setCurrentList(current_list)}
        else current_list = []
    }

    const list_gr = listGroups.map(e=><Element url={e} key={e.group}>{e.group}</Element>)

    // console.log(userAcc)
    useEffect(()=>{
        getAllGroupsMessages()
    },[create])
    
    useDarkModeMain()
    return(
        <div className='window_wrap' >
            <Header/>
           
            {create?<Window setCreate={setCreate}/>:null}
            <div className='select'>
                <div className='setting_groups'>
                    <input placeholder="Search..." className='input_search' value={search} onChange={(e)=>changeSearch(e)} type="text" />
                    {/* <img src={add} onClick={()=>setCreate(true)}/> */}
                    <button className='button' onClick={()=>setCreate(true)}>Add</button>
                </div>
                
                {
                    isLoading?
                    <div>Loading...</div>
                    :<div className='list'>
                        {search.length !== 0 ? currentList.map(e=><Element url={e} key={e.group}>{e.group}</Element>) : list_gr}
                    </div>
                }
                
            </div>
            
            
        </div>
    )
}