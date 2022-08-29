import React, { Children, useContext } from "react";
import el from './element.module.css'
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { readingMessages } from "../../firebase";

const Element = ({children,url,setUpdate,...props}) => {
    const ref = useNavigate()
    const {setGroup, group} = useContext(Context)
    function handleClick(){
         ref(`/chat/${url.group}`);
            setGroup(children);
            readingMessages();
    }
    return(
        <div className={group==children?[el.group, el.activeGroup].join(' '):el.group} onClick={handleClick}>
            <span>{children}</span>
        </div>
    )
    
}
export default Element