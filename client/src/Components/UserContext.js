import React from 'react';
import {useState,createContext} from "react";


const UserContext = createContext();


export const UserProvider  = ({children}) => {
    const [currentUser, setCurrentUser ] = useState({"id": 4, "name": "Mel Needle",
     "username": "however", "background": "Memory front really factor anyone culture.", 
     "online_status": "online", "online": "2023-07-15 23:59:30", "avatar": "https://img.freepik.com/free-photo/worldface-british-guy-white-background_53876-14467.jpg"})

    const user = JSON.parse(localStorage.getItem("user"));
	if (!user) {
		return {}}
    else{
        setCurrentUser();
    }
    console.log(JSON.parse(localStorage.getItem("user")))
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>

    );
    };

export default UserContext;