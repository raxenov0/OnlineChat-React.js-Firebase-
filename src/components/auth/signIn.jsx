import React, { useContext, useRef, useState } from "react";
import { signIn } from "../../firebase.jsx";
import toast, {Toaster} from 'react-hot-toast'
import  './auth.css'
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Context } from "../../App";
import { useDarkModeSign } from "../../hooks/useDarkModeSign.jsx";

export const SignIn = () =>{
 
    const [email, setEmail] = useLocalStorage('email', '')
    const [password, setPassword] = useLocalStorage('password', '')
    const {setIsAuth, setUser, setUserAcc, userAcc} = useContext(Context)

    const ref = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        var user = await signIn(email, password);
        if(user){
            setIsAuth(true)
            setUser(user.email)
            setUserAcc(user)
            ref('/')
        }
        return user  
    }
    useDarkModeSign()
    
    return(
        <div className='container'>
            <div className='screen'>
                <div className='screen__content'>
                    <form onSubmit={handleSubmit} className='login'>
                        
                        <div className='login__field'>
                            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className='login__input' placeholder="User name / Email"/>
                        </div>
                        <div className='login__field'>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='login__input' placeholder="Password"/>
                        </div>
                        <button className='button_login login__submit'>
                            <span className='button__text'>Log In Now</span>
                        </button>				
                    </form>
                    <div className='social_login'>
                        <h3>Don't have an account?</h3>
                        <Link className='link' to="/login"> Registration </Link>
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
    )
}