import React, { useContext, useEffect } from "react";
import { Context } from "../App";
import hd from './hd.module.css'
import { logOut } from "../firebase";
import setting from './../img/setting.png'
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const url = useNavigate()
    const {userAcc,setUserAcc, setIsAuth} = useContext(Context)

    function logOutAcc(){
        setIsAuth(false)
        setUserAcc({})
        logOut()
    }

    return(
        <div id="header" className={hd.header}>
            <img className={hd.img} src={userAcc.photoURL} alt="" />
            <span>{` ${userAcc.displayName}`}</span>
            <div className={hd.setting}>
                <div onClick={()=>url('/setting')}>
                    <img src={setting} alt="" />
                    <p>Setting</p>
                </div>
                
                <button onClick={logOutAcc}>Log out</button>
            </div>
            
        </div>
    )
}