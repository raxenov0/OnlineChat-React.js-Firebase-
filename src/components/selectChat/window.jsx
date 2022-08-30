import React, { useContext, useState } from "react";
import './selectChat.css'
import { toast } from "react-hot-toast";
import { createNewGroup } from "../../firebase";
import { Context } from "../../App";
import { useRef } from "react";
import { useEffect } from "react";

export const Window = ({setCreate,setUpdate}) => {
    const {userAcc} = useContext(Context)
    const [nameGroup, setNameGroup] = useState('')
    const [warning, setWarning] = useState(false)
    const input = useRef(null)

    async function clickOnButton_newGroup(){
        try{
           await createNewGroup(nameGroup, userAcc)
           setCreate(false)
           setUpdate(props=>!props)
        } catch(error){
            toast.error(error)
        }
    }

    function inputName(e){
        if(e.target.value.length > 22 ) setWarning(true)
        else {
            setNameGroup(e.target.value)
            setWarning(false)
        }
    }

    useEffect(()=>{
        input.current.focus()
    },[])

    return(
        <div className='wrapper_page' onClick={()=>setCreate(false)}>
            <div onClick={(e)=> e.stopPropagation()} className='content_page'>
                <span style={{color:warning?'#bb7373':'black'}}>{warning?'Title too long':'Name of your group'}</span>
                <input ref={input} type="text" onChange={(e)=> inputName(e)} className='input_page' />
            <button disabled={(warning || nameGroup.length < 3) ? true :false} onClick={()=>clickOnButton_newGroup()} className={(warning || nameGroup.length < 3) ?'btn btn_red':'btn'}>Create</button>
            </div>
        </div>
    )
}