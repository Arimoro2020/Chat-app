import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom";
import Contacts from "./components/Contacts";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile";
import {UserProvider} from "./components/UserContext";

import Login from "./components/Login";
import Signup from "./components/Signup";
// import UserContext from "./components/UserContext";
// import {useContext} from "react";

import { useNavigate } from "react-router-dom";



function App() {
	const [conversations, setConversations] = useState([]);
	const [userConversations, setUserConversations] = useState([]);
	const [messages, setMessages] = useState([]);
	const [chatList, setChatList] = useState([]);
	const [ incoming, setIncoming] = useState([]);
	const [chatRoom, setChatRoom] = useState(null);
	const [chatMate, setChatMate] = useState(null);
	
	const [currentUser, setCurrentUser ] = useState({"id": 1, "name": "Melissa Mejia",
	"username": "suddenly", "background": "Pattern century arrive", 
	"online_status": "online", "created_at": "2023-07-12 12:20:28", avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"})



    const [formBody, setFormBody] = useState("")
    // const [editBody, setEditBody] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [id, setId] = useState(null)

	const navigate = useNavigate();



    function handleOnClickButton(chat){
        setIsEditing(isEditing=>!isEditing)
        setFormBody(chat.content_body)
        setId(parseInt(chat.id))
    }
    function handleOnChange(e){
        setFormBody(e.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault();
			if (isEditing) {
		
				fetch(`/messages/${parseInt(id)}`, {
					method: "PATCH",
					headers: {
					"Content-Type": "application/json",
					},
					body: JSON.stringify({content_data: formBody}),
				})
					.then((r) => r.json())
					.then((update) =>{ setMessages([...messages, update]);
						setFormBody("")
						setIsEditing(isEditing=>!isEditing)})
		
			}
			else{
				fetch("/messages", {
					method: "POST",
					headers: {
					"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user_id: parseInt(currentUser.id),
						content_type: "string",
						content_data: formBody}),
				})
					.then((r) => r.json())
					.then((update) =>{ setMessages([...messages, update]);
							setFormBody("")})	
								
				}
	}
			

	function handleOnDelete(chat){
		fetch(`/messages/${parseInt(chat.id)}`, {
			method: "DELETE",
		  });

		  const removedDeleted = [...messages].filter(message => message.id !== parseInt(chat.id));
		  setMessages(removedDeleted); 
	}

	function handleOnClick(contact){
		
        fetch(`/conversations`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({"conversation_name": contact.name})

		})
            .then((r) => r.json())
            .then((data) =>setConversations([...conversations, data]))

		const filteredName = conversations.filter((el) => {
			return el.name.toLowerCase().includes(contact.name.toLowerCase());
			})  

		fetch(`/user_conversations`, {
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			},
			body: JSON.stringify({"conversation_id": parseInt(filteredName.id),
				
									"user_id": parseInt(contact.id)})

		})
			.then((r) => r.json())
			.then((data) =>setUserConversations([...userConversations, data]))

		
	}
	

	
	
	useEffect(() => {
		fetch("/user_conversations")
			.then((res) => res.json())
			.then(data => setUserConversations([...userConversations, data]));
		fetch("/conversations")
			.then((res) => res.json())
			.then(data => setConversations([...conversations, data]));
		fetch("/messages")
			.then((res) => res.json())
			.then(data => setMessages([...messages, data]));
		// fetch("/check_session")
		// 	.then((res)=>{
		// 		if (res.ok) {
		// 			res.json().then((data)=>setCurrentUser(data));
		// 			console.log(currentUser);	
		// 		} else {
		// 			setCurrentUser(null);
		// 		}
		// 	});
		getChatList();
				
	}, []);

	function getChatList(){						
		const filteredMessageId = [...messages].filter((el)=>parseInt(el.user_id) === parseInt(currentUser.id));
		
		const messagesId = [...filteredMessageId].filter((el)=>parseInt(el.conversation_id));
		
		const filteredParticipants = [...conversations].filter((el)=>parseInt(messagesId).includes(parseInt(el.id)));
		
		setChatList([...chatList, filteredParticipants]);

		

		const filteredReceivedMessages = [...messages].filter((el)=>{
				return parseInt(el.conversation_id) === (parseInt(filteredParticipants.id))}
				);

		setIncoming([...incoming, filteredReceivedMessages]);
		
	}
	
	function handleNewMessageOnClick(fresh, sender){

		const filteredChatRoom = [...messages].filter((el)=>{
			return el.conversation_id === parseInt(fresh.conversation_id)});

			setChatRoom(filteredChatRoom);
			setChatMate(sender.name);
			navigate("/chat_room");
			
		

	}


	function handleButtonOnClick(chat){
		const filteredListToRoom = [...messages].filter((el)=>{
			return el.conversation_id === parseInt(chat.id)});

			setChatRoom(filteredListToRoom);
			const participant = chat.name
			setChatMate(participant);
			navigate("/chat_room");



	}
	
    
	if (!currentUser){
		return (
			<div className="Not Authorized">
				<Navigation />
				<Login />
			</div>
		)
	}
	
	

	return (
		
		<div className="Chat App">
			
			<UserProvider>
			<Navigation />
			<Routes>
        		<Route exact path="/home" element={<Home incoming={incoming} handleNewMessageOnClick={handleNewMessageOnClick}/>}  />
				< Route exact path = "/signup" element={<Signup />} />
				< Route exact path = "/" element={<Login />} />
				< Route exact path = "/contacts" element={<Contacts handleOnClick={handleOnClick}/>} />
				< Route exact path = "/chat_list" element={<ChatList  chatList={chatList} handleButtonOnClick={handleButtonOnClick}/>} />
				< Route exact path = "/chat_room" element={<ChatRoom  chatRooM={chatRoom} chatMate={chatMate} formBody={formBody} 
				handleFormSubmit={handleFormSubmit} handleOnClickButton={handleOnClickButton} 
				handleOnChange={handleOnChange} handleOnDelete={handleOnDelete}/>} />
				< Route exact path = "/user_profile" element={<UserProfile />} />
			</Routes>
			</UserProvider>
		</div>
		
	);
	}

export default App;

