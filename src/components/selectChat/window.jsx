import React, { useContext, useState } from "react";
import './selectChat.css'
import { toast } from "react-hot-toast";
import { createNewGroup } from "../../firebase";
import { Context } from "../../App";

export const Window = ({setCreate}) => {
    const {userAcc} = useContext(Context)
    const [nameGroup, setNameGroup] = useState('')

    async function clickOnButton_newGroup(){
        try{
           await createNewGroup(nameGroup, userAcc)
           setCreate(false)
        } catch(error){
            toast.error(error)
        }
    }


    return(
        <div className='wrapper_page' onClick={()=>setCreate(false)}>
            <div onClick={(e)=> e.stopPropagation()} className='content_page'>
                <span>Name of your group</span>
                <input type="text" onChange={(e)=> setNameGroup(e.target.value)} className='input_page' />
                <button onClick={()=>clickOnButton_newGroup()}className='btn'>Create</button>
            </div>
        </div>
    )
}