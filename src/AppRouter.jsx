import React, { useContext, useState } from "react";
import { pathRouter } from "./pathRouter";
import { Routes, Route, Link } from "react-router-dom";
import { Context } from "./App";
import {Toaster} from 'react-hot-toast'

export const AppRouter = () =>{
    const {isAuth} = useContext(Context)
    return(
        <>
            <Toaster></Toaster>
            {isAuth ?
                <Routes>
                    {pathRouter.privateRouter.map((route, index) => {
                        return <Route key = {index} path = {route.path} element={<route.Element />}/>
                        })}
                </Routes>
            :
            <Routes>
                {pathRouter.publicRouter.map((route, index) => {
                    return <Route key = {index} path = {route.path} element={<route.Element />}/>
                    })}
            </Routes>
            }
        </>
    )
}