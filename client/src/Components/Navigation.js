import React, {useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import {useContext} from "react";
import Clock from "./Clock";
import DarkMode from './DarkMode';
import { ReactComponent as LockSvg } from "/Users/yemiarimoro/Development/code/My-App/Chat-app/client/src/login_locked.svg";
import { ReactComponent as UnlockSvg } from "/Users/yemiarimoro/Development/code/My-App/Chat-app/client/src/login_unlocked.svg";


function Navigation() {
	const [login, setLogIn] = useState(false)
	const navigate = useNavigate();
	const {currentUser} = useContext(UserContext);

	const linkStyles = {
        display: "inline-block",
        width: "80px",
        padding: "12px",
        margin: "0 6px 6px",
        background: "steelBlue",
        textDecoration: "none",
        color: "white",
      };

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
		<>
		<header   style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
			<div className="menu">
				<NavLink className="button" to="/home" end style={linkStyles}
        activeStyle={{
          background: "#4682b4",
        }}>
					Home
				</NavLink>
				<NavLink className="button" to="/chat_list" style={linkStyles}
        activeStyle={{
          background: "#4682b4",
        }}>
					Chat List
				</NavLink>
				<NavLink className="button" to="/chat_room" style={linkStyles}
        activeStyle={{
          background: "#4682b4",
        }}>
					Chat Room
				</NavLink>
				<NavLink className="button" to="/contacts" style={linkStyles}
        activeStyle={{
          background: "#4682b4",
        }}>
					Contacts
				</NavLink>
                <NavLink className="button" to="/user_profile"style={linkStyles}
        activeStyle={{
          background: "#4682b4",
        }} >
					UserProfile
				</NavLink>
				<NavLink className="button" to="/signup" style={linkStyles}
        activeStyle={{
          background: "#4682b4",
        }}>
					Sign Up
				</NavLink>
				<NavLink className="button" onClick={handleLogout} style={linkStyles}
        activeStyle={{
          background: "#4682b4",
        }}>
							{ currentUser && login ? <LockSvg width={"70px"}  padding={"12px"} fill={"#000"} /> : <UnlockSvg width={"70px"}  padding={"12px"} fill={"#000"}/>}
				</NavLink>
						
			</div>
		</header>
		<Clock />
		<DarkMode/>
		</>
	);
}

export default Navigation;