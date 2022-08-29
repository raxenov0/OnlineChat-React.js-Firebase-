import React from "react"
import {Auth} from './components/auth/auth'
import {SelectChat} from './components/selectChat/selectChat'
import {Chat} from './components/chat/chat'
import { SignIn } from "./components/auth/signIn"
import { White } from "./components/whitelist"
import { Setting } from "./components/setting/setting"

export const pathRouter = {
    publicRouter:[
        {path:'/login', Element: Auth},
        {path:'/sign', Element: SignIn},
        {path:'/list', Element: White},
        {path:'/', Element: SignIn},
        {path:'/*', Element: SignIn}
    ],
    privateRouter:[
        {path:'/', Element: SelectChat},
        {path:'/chat/:chat', Element: SelectChat},
        {path:'/setting', Element: Setting},
        {path:'/*', Element: SelectChat}
    ]
}