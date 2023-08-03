import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import {useContext} from "react";

function Navigation() {
	const navigate = useNavigate();
	const {currentUser} = useContext(UserContext);

	function handleLogout() {
		fetch("/logout",{
		method: "DELETE",
		headers: {
			"content-type": "application/json",
		},}).then((res) => {
			if (res.ok){
				navigate("/");
			}
		});
	}

	return (
		<header>
			<div className="menu">
				<NavLink className="button" to="/home" end>
					Home
				</NavLink>
				<NavLink className="button" to="/chat_list" >
					Chat List
				</NavLink>
				<NavLink className="button" to="/chat_room" >
					Chat Room
				</NavLink>
				<NavLink className="button" to="/contacts">
					Contacts
				</NavLink>
                <NavLink className="button" to="/user_profile" >
					UserProfile
				</NavLink>
				<NavLink className="button" to="/signup" >
					Sign Up
				</NavLink>
				<NavLink className="button" to="/" >
					Log In
				</NavLink>
				{ currentUser ? 
					(<>
						<button onClick={()=>handleLogout()} className="button">
							Log Out
						</button>
					</>) : 
					''
				}		
			</div>
		</header>
	);
}

export default Navigation;