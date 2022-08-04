import React, { useContext } from "react";
import { Context } from "../../App";
import { useDarkModeMessage } from "../../hooks/useDarkModeMessage";
import './chat.css'

export const Message = ({data}) =>{

    const {userAcc} = useContext(Context)
	function UsesDate(data){
		let day = new Date().getDate()
		let month = new Date().getMonth()+1;
		let years = new Date(). getFullYear()
		let hours = new Date().getHours();
		let minute = new Date().getMinutes()

		
		let curDay = new Date(data).getDate()
		let curMonth = new Date(data).getMonth()+1;
		let curYears = new Date(data). getFullYear()

		if(years==curYears && month == curMonth && day == curDay )
		return `Today, ${hours}:${minute}`
		else if(years==curYears && month == curMonth && (day - curDay  == 1) ) return "Yesterday"
		else return `${curDay}.${curMonth}.${curYears}`

	}
	UsesDate(data.createAt)
	
    return(
        <li className={userAcc.email == data.uid ? "me" : "you"}>
			<div className="entete">
				<div className={userAcc.email == data.uid ? "flex" : "flex_reverse"}>
					<h2>{data.displayName}</h2>
					<img src={data.photoURL} alt="" />
				</div>
				<h3>{UsesDate(data.createAt)}</h3>
			</div>
			
			<div className="message">
					{data.message}
			</div>
		</li>
    )
}