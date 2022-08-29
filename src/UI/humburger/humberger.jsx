import React from 'react'
import { useContext, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../App'
import { logOut } from '../../firebase'
import humb from './humburger.module.css'
import hd from './../hd.module.css'
import setting from './../../img/setting.png'

const Humburger = () => {

    const url = useNavigate()
    const hrefUrl = useCallback(() => url('/setting'), [])
    const { userAcc, setUserAcc, setIsAuth } = useContext(Context)

    const logOutHook = useCallback(function logOutAcc() {
        setIsAuth(false)
        setUserAcc({})
        logOut()
    }, [])


    return (
        <nav className={humb.wrapper}>
            <div className={humb.navbar}>
                <div className={[humb.container, humb.nav_container].join(' ')}>
                    <input className={humb.checkbox} type="checkbox" name="" id="" />
                    <div className={humb.hamburger_lines}>
                        <span className={[humb.line, humb.line1].join(' ')}></span>
                        <span className={[humb.line, humb.line2].join(' ')}></span>
                        <span className={[humb.line, humb.line3].join(' ')}></span>
                    </div>
                    <div className={humb.menu_items}>
                        <div>
                            <img className={humb.img} src={userAcc.photoURL} alt="" />
                            <span>{` ${userAcc.displayName}`}</span>
                        </div>

                        <div className={humb.setting}>
                            <div onClick={hrefUrl}>
                                <img src={setting} alt="" />
                                <p>Settings</p>
                            </div>

                            <button onClick={logOutHook}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Humburger