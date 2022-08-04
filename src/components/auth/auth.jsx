import React, { useContext, useState } from "react";
import { register } from "../../firebase.jsx";
import toast, {Toaster} from 'react-hot-toast'
import './auth.css'
import { Context } from "../../App";
import {Link, useNavigate} from 'react-router-dom'
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDarkModeSign } from "../../hooks/useDarkModeSign.jsx";


export const Auth = () =>{
    const [reg_email, setRegEmail] = useLocalStorage('reg_email','')
    const [reg_password, setRegPassword] = useState('reg_password','')
    const [userName, setUserName] = useState('')
    const {setIsAuth, setUser, setUserAcc, userAcc} = useContext(Context)
    const ref =  useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        var user = await register(reg_email, reg_password, userName);
        // console.log(user)
        if(user){
            setIsAuth(true)
            setUser(user.email)
            setUserAcc(user)
           ref('/')
        } else toast.error("Error")
        return user
    }
    console.log(process.env.REACT_APP_API_KEY)
    useDarkModeSign()
    return(
        <>
            <Toaster/>
            <div className='container'>
            <div className='screen'>
                <div className='screen__content'>
                    <form onSubmit={handleSubmit} className='login1'>
                        
                        <div className='login__field'>
                            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} className='login__input' placeholder="User name"/>
                        </div>
                        <div className='login__field'>
                            <input type="text" value={reg_email} onChange={(e)=>setRegEmail(e.target.value)} className='login__input' placeholder="Email"/>
                        </div>
                        <div className='login__field'>
                            <input type="password" value={reg_password} onChange={(e)=>setRegPassword(e.target.value)} className='login__input' placeholder="Password"/>
                        </div>
                        <button className='button_login login__submit'>
                            <span className='button__text'>Create</span>
                        </button>				
                    </form>
                    <div className='social_login'>
                        <h3>Do you have an account?</h3>
                        <Link className='link' to="/sign"> Sign in </Link>
                    </div>
                </div>
                <div className='screen__background'>
                    <span className='screen__background__shape screen__background__shape4'></span>
                    <span className='screen__background__shape screen__background__shape3'></span>		
                    <span className='screen__background__shape screen__background__shape2'></span>
                    <span className='screen__background__shape screen__background__shape1'></span>
                </div>		
            </div>
        </div>
    </>
    )
}