import React, { memo, useContext, useEffect } from "react";
import { Context } from "../App";
import hd from './hd.module.css'
import { logOut } from "../firebase";
import setting from './../img/setting.png'
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const Header = memo(() => {
    
    const url = useNavigate()
    const hrefUrl = useCallback(()=> url('/setting'),[])
    const {userAcc,setUserAcc, setIsAuth} = useContext(Context)
    
    const logOutHook = useCallback(function logOutAcc(){
        setIsAuth(false)
        setUserAcc({})
        logOut()
    },[])

    return(
        <div id="header" className={hd.header}>
            <img className={hd.img} src={userAcc.photoURL} alt="" />
            <span>{` ${userAcc.displayName}`}</span>
            <div className={hd.setting}>
                <div onClick={hrefUrl}>
                    <img src={setting} alt="" />
                    <p>Setting</p>
                </div>
                
                <button onClick={logOutHook}>Log out</button>
            </div>
            
        </div>
    )
})