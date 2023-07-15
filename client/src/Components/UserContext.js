import React from 'react';
import {useState,createContext} from "react";


const UserContext = createContext();


export const UserProvider  = ({children}) => {
    const [currentUser, setCurrentUser ] = useState({"id": 1, "name": "Melissa Mejia",
     "username": "suddenly", "background": "Pattern century arrive", 
     "online_status": "online", "created_at": "2023-07-12 12:20:28", "avatar": "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"})

    // const user = JSON.parse(localStorage.getItem("user"));
	// if (!user) {
	// 	return {}}
    // else{
    //     setCurrentUser();
    // }
    // console.log(JSON.parse(localStorage.getItem("user")))
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>

    );
    };

export default UserContext;