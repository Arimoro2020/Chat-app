import React, {useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import {useContext} from "react";


function Navigation() {
	const [login, setLogIn] = useState(false)
	const navigate = useNavigate();
	const {currentUser} = useContext(UserContext);

	function handleLogout() {
		fetch(`http://localhost:5555/logout`,{
			method: "DELETE",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",
				},
		}).then(() => setLogIn(login=>!login))
			.then(()=> navigate("/"))
				
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
				<NavLink className="button" onClick={handleLogout} >
							{ currentUser && login ? "LogOut" : "LogIn" }
				</NavLink>
						
			</div>
		</header>
	);
}

export default Navigation;