import React from 'react';
import {useState,createContext} from "react";


const UserContext = createContext(null);


export const UserProvider  = ({children}) => {
    const [currentUser, setCurrentUser ] = useState(null)

    const user = localStorage.getItem('user');
    setCurrentUser(user);
	if (!user) {
		return null}

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>

    );
    };

export default UserContext;