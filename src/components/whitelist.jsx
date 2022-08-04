import React, { useState, useEffect} from "react";
import {currentText, readingText} from './../firebase'


export const White = () =>{
    const [text, setText] = useState('null')
    const [value, setValue] = useState('')
    function onSubmitFn(){
        currentText(value)
        setValue('')
    }
    
    

    readingText(setText, text)
   
    

  
    return(
        <div>
            <input onChange={(e)=>setValue(e.target.value)} value={value} type="text" />
            <button onClick={()=>onSubmitFn()}>Sent</button>
            <div>{text}</div>
        </div>
    )
}