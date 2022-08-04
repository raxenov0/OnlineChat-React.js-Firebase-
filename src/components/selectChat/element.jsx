import React, { Children, useContext } from "react";
import el from './element.module.css'
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { readingMessages } from "../../firebase";

const Element = ({children,url,...props}) => {

    const ref = useNavigate()
    const {setGroup} = useContext(Context)

    return(
        <div className={el.group} onClick={()=>{
            ref(`/chat/${url.group}`);
            setGroup(children)
            readingMessages()
        }}>
            <span>{children}</span>
        </div>
    )
    
}
export default Element