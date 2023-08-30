import React from 'react';
import {useEffect, createContext} from "react";
import Login from './Login';
import { useLocalStorage} from './useLocalStorage';



const UserContext = createContext();




export const UserProvider  = ({children}) => {

    const [initialValues, setInitialValues] = useLocalStorage("isLoggedIn", {
        'username': "",
        'password': ""
    });
    

    const [currentUser, setCurrentUser ] = useLocalStorage("user", {
        'id': "",
        'username': "",
        'password': "",
        'name': "",
        'avatar': "",
        'background': "",
        'status': ""
  });

    useEffect(() => {
     
	if (!initialValues) return;
	if (initialValues.username === currentUser.username) return;
	fetch(`http://localhost:5555/users/`+initialValues.username, {
        method: "GET",
        crossDomain: true,
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
            "Access-control-Allow-Origin":"*",
        }
    })
			.then(res=>res.json())
			.then(data =>setCurrentUser(data))
            .catch(console.error);

	},[setCurrentUser, setInitialValues]);
    
    console.log(currentUser);
    console.log(initialValues);
    return (
        <UserContext.Provider value={{currentUser, setCurrentUser, initialValues, setInitialValues}}>
           {currentUser? children : <Login />}
        </UserContext.Provider>

    );
    };

export default UserContext;