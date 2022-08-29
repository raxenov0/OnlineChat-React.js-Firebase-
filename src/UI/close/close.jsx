import React from "react";
import { useNavigate } from "react-router-dom";
import './close.css'

export const Close = () => {
    const url = useNavigate()
    return (
        <span onClick={() => url(-1)} className="arrowV2 left-type"></span>
    )
}

export const CloseV2 = () => {
    const url = useNavigate()
    return (
        <span onClick={() => url(-1)} className="arrowV3 left-type"></span>
    )
}