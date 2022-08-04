import React, { useEffect, useState } from "react";


export function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)))
    
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}