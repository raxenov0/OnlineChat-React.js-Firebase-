import React, { useState, useEffect, useContext } from "react";
import { Window } from "./window";
import { getGroups } from './../../firebase'
import './selectChat.css'
import Element from './element'
import { Context } from "../../App";
import { useDarkModeMain } from "../../hooks/useDarkModeMain";
import { useCallback } from "react";
import { Chat } from "../chat/chat";
import { useParams } from "react-router-dom";
import add from './../../img/add.png'
import { useRef } from "react";
import Humburger from './../../UI/humburger/humberger'
import { EmptyChat } from "../chat/emptyChat";
import { nanoid } from "nanoid";




export const SelectChat = () => {
    let list = []
    const [create, setCreate] = useState(false)
    const [listGroups, setListGroups] = useState(list)
    const [currentList, setCurrentList] = useState([])
    const [search, setSearch] = useState('')
    const [update, setUpdate] = useState(false)
    const { isLoading, setIsLoading, group } = useContext(Context)
    const input = useRef(null)
    const url = useParams()

    async function getAllGroupsMessages() {
        setIsLoading(true)
        const groups = await getGroups()
        list = []
        groups.forEach((doc) => { list.push(doc.data()) })
        setListGroups(list.sort((a, b) => { return b.createAt - a.createAt }))
        setIsLoading(false)
    }

    let current_list = []

    function changeSearch(e) {
        setSearch(e.target.value)
        if (e.target.value.length !== 0) {
            current_list = listGroups.filter((gr) => { return gr.group.toLowerCase().includes(e.target.value.toLowerCase()) });
            setCurrentList(current_list)
        }
        else current_list = []
    }

    const list_gr = listGroups.map(e => <Element url={e} key={nanoid()}>{e.group}</Element>)

    useEffect(() => {
        getAllGroupsMessages()
        input.current.focus()
    }, [update])

    useCallback(useDarkModeMain(), [])

    return (
        <div className={url.chat?'chat_list window_wrap':'window_wrap'} >

            {create ? <Window setUpdate={setUpdate} setCreate={setCreate} /> : null}
            <div className="groupChats">

                <div className='select'>
                    <Humburger/>
                    <div className='setting_groups'>

                        <input ref={input} placeholder="Search..." className='input_search' value={search} onChange={(e) => changeSearch(e)} type="text" />
                        <img src={add} className='button' onClick={() => setCreate(true)}/>
                    </div>
                    {
                        isLoading ?
                            <div>Loading...</div>
                            : <div className='list'>
                                {search.length !== 0 ? currentList.map(e => <Element url={e} key={nanoid()}>{e.group}</Element>) : list_gr}
                            </div>
                    }
                </div>
                {url.chat?<Chat CurrentGroup={group}/>:<EmptyChat/>}
            </div>



        </div>
    )
}