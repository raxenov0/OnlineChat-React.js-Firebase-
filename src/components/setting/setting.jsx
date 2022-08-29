import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Context } from "../../App";
import { downloadImage, getImage, getMyGroups, updateName, updateEmails, updateInfo, verificationEmail } from "../../firebase";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Close } from "../../UI/close/close";
import emptyImg from './../../img/emptyImg.jpg'
import mark from './../../img/mark.png'
import './setting.css'

export const Setting = () => {
    const { userAcc, setUserAcc, setIsLoading, isLoading } = useContext(Context)
    const [name, setName] = useState(userAcc.displayName)
    const [email, setEmail] = useState(userAcc.email)
    const [text, setText] = useState(userAcc.data.about)

    async function handleChange(e) {
        const file = await downloadImage(e.target.files[0], userAcc)
        await getImage(file, userAcc, setUserAcc)
    }

    async function getGroups(user) {
        setIsLoading(true)
        const groups = await getMyGroups(user)
        setUserAcc({ ...userAcc, data: groups })
        setIsLoading(false)
    }

    useEffect(() => {
        getGroups(userAcc)
    }, [])

    const [isDarkMode, setDarkMode] = useDarkMode()

    return (
        <div className="wrapper">
           
            <div className="content">
                 <Close/>
                <div className="left_content">
                    <img src={userAcc.photoURL ? userAcc.photoURL : emptyImg} alt="" />
                    <p className="username">{userAcc.displayName}</p>
                    <p className="email">{userAcc.email}</p>
                    <hr style={{ width: '70%', margin: '20px auto' }} />
                    <p className="createacc">Account creation date:</p>
                    <p className="dataCreateAcc">{userAcc.metadata.creationTime}</p>
                    <div className="myChats">
                        <p>My chats:</p>
                        <div className="chat_element">
                            {isLoading
                                ? <div>loading...</div>
                                : userAcc.data.myGroup.length !== 0 ? userAcc.data.myGroup.map((e, i) => <button className="btn" key={i}>{e}</button>) : "No own chats yet"
                            }
                        </div>


                    </div>
                </div>
                <div className="right_content">

                    <div className="main_content_profile">
                        <p className="text">Personal details</p>
                        <div className="swap_main_data">
                            <div className="photo_topic">
                                <div className="photo">
                                    <img onMouseOver={(e) => { e.target.className = 'hover' }} onMouseOut={(e) => { e.target.className = "" }} src={userAcc.photoURL} alt="">

                                    </img >
                                    <span onMouseOver={(e) => { e.target.parentNode.firstChild.className = 'hover' }}>Change</span>
                                    <input onMouseOver={(e) => { e.target.parentNode.firstChild.className = 'hover' }} onMouseOut={(e) => { e.target.parentNode.firstChild.className = "" }} type="file" className="profile_pic" name="profile_pic" onChange={(e) => handleChange(e)} accept="image/*,.jpg,.jpeg,.png,.web" />
                                </div>
                                <div className="topic">
                                    <span>Select topic</span>
                                    <select defaultValue={localStorage.getItem('topic')} onChange={(e) => { setDarkMode(e.target.value); localStorage.setItem('topic', e.target.value) }} >
                                        <option value="White" name="White" id="">White</option>
                                        <option value="Black" name="White" id="">Black</option>
                                    </select>
                                </div>
                            </div>

                            <div className="change_name">
                                <p>UserName</p>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                                <button className="btn" onClick={() => { updateName(name); setUserAcc({ ...userAcc, displayName: name }) }}>Save</button>

                                <p>Email</p>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                                <button className="btn" onClick={() => { updateEmails(email); setUserAcc({ ...userAcc, email: email }) }}>Save</button>
                                <div className="verification">
                                    <p>Email account:</p> {userAcc.emailVerified ? <img src={mark} /> : <button className="btn" onClick={verificationEmail}>confirm</button>}
                                </div>


                                <p>About Me</p>
                                <div className="text_block">

                                    <textarea value={text} onChange={(e) => setText(e.target.value)} name="" id="" cols="45" rows="6"></textarea>
                                    <button className="btn" onClick={() => { try { updateInfo(userAcc, text); setUserAcc({ ...userAcc, about: text }) } catch { toast.error("Oopss..") } }}>
                                        <div className="checkmark">L</div>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}