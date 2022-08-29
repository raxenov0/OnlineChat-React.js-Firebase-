import React, { memo, useContext } from "react";
import { useCallback } from "react";
import { Context } from "../../App";
import './chat.css'

export const Message = memo(({ data }) => {
	// console.log('render mes')
	const { userAcc } = useContext(Context)
	const UsesDate = useCallback((data) => {
		let day = ('0' + new Date().getDate()).slice(-2)
		let month = ('0' + (new Date().getMonth() + 1)).slice(-2);
		let years = new Date().getFullYear()
		let hours = ('0' + new Date().getHours()).slice(-2);
		let minute = ('0' + new Date().getMinutes()).slice(-2)


		let curDay = ('0' + new Date(data).getDate()).slice(-2)
		let curMonth = ('0' + (new Date(data).getMonth() + 1)).slice(-2);
		let curYears = new Date(data).getFullYear()

		if (years == curYears && month == curMonth && day == curDay)
			return `Today, ${hours}:${minute}`
		else if (years == curYears && month == curMonth && (day - curDay == 1)) return "Yesterday"
		else return `${curDay}.${curMonth}.${curYears}`
	}, [])

	UsesDate(data.createAt)

	return (
		<li className={userAcc.email == data.uid ? "me" : "you"}>
			<div className="entete">
				<div className={userAcc.email == data.uid ? "flex" : "flex_reverse"}>
					<div>
						<h2>{data.displayName}</h2>
					</div>

					<img src={data.photoURL} alt="" />
				</div>

			</div>

			<div className="message">
				<span>
					{data.message}
				</span>
				
				<div className="time_info">
					<h3>{UsesDate(data.createAt)}</h3>
				</div>
			</div>
		</li>
	)
})