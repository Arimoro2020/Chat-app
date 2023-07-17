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
	const [chatRoom, setChatRoom] = useState([]);
	const [chatMate, setChatMate] = useState("");
	const [allMessages, setAllMessages] = useState([]);
	
	const [currentUser, setCurrentUser ] = useState({"id": 4, "name": "Mel Needle",
     "username": "however", "background": "Memory front really factor anyone culture.", 
     "online_status": "online", "online": "2023-07-15 23:59:30", "avatar": "https://img.freepik.com/free-photo/worldface-british-guy-white-background_53876-14467.jpg"})


    const [formBody, setFormBody] = useState("")
    // const [editBody, setEditBody] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [id, setId] = useState(null)

	const navigate = useNavigate();



	
	
	useEffect(() => {



		fetch(`/user_conversations`)
			.then((res) => res.json())
			.then(data =>{
				if(userConversations !== data){setUserConversations(data)}});
		fetch(`/conversations/${currentUser.name}`)
			.then((res) => res.json())
			.then(data =>{
				if(conversations !== data){setConversations(data)}});
	
		fetch(`/messages`)
			.then((res) => res.json())
			.then(data =>{
				if(allMessages !== data){setAllMessages(data)}});
		getList();
	
	}, []);

	function getList(){			
		const  getMessages = [...allMessages].filter((message) => {
			return (message.user_id === currentUser.id)})

			if(messages !== getMessages){
				setMessages(getMessages)};

		}
		
		
	function handleNewMessageOnClick(fresh){

		const filteredChatRoom = [...messages].filter((el)=>parseInt(el.conversation_id) === parseInt(fresh.conversation_id));

			fetch(`/users/${parseInt(fresh.user_id)}`).then(res=>res.json()).then(data=>{if(chatMate !== data.name){setChatMate(data.name)}})

			
			if (chatRoom !== filteredChatRoom){
			setChatRoom(filteredChatRoom)};
			navigate("/chat_room");
			
		

		}


		function handleButtonOnClick(chat){
			const filteredListToRoom = [...messages].filter((el)=>{
				return parseInt(el.conversation_id) === parseInt(chat.id)});

				if(chatRoom !== filteredListToRoom){
				setChatRoom(filteredListToRoom)};
				const participant = chat.name;
				if (chatMate !== participant){
					setChatMate(participant)};
				navigate("/chat_room");



		}

		function handleOnClickButton(chat){
			setIsEditing(isEditing=>!isEditing);
			if(formBody !== chat.content_body){
				setFormBody(chat.content_body)};
			if(parseInt(id) !== parseInt(chat.id)){setId(parseInt(chat.id))}
		}
		function handleOnChange(e){
			if(formBody !== e.target.value){
			setFormBody(e.target.value)};
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
						.then((update) =>{ if(messages !== [...messages, update]){setMessages([...messages, update])};
							if(formBody !== ""){setFormBody("")};
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
						.then((update) =>{ if(messages !== [...messages, update]){setMessages([...messages, update])};
								if(formBody !== ""){setFormBody("")}	
									
					})
		}}
		

		function handleOnDelete(chat){
			fetch(`/messages/${parseInt(chat.id)}`, {
				method: "DELETE",
			});

			const removedDeleted = [...messages].filter(message => parseInt(message.id) !== parseInt(chat.id));
			if(messages !== removedDeleted){
				setMessages(removedDeleted)}; 
		}

		function handleOnClick(contact){
			
			fetch(`/conversations`, {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({"conversation_name": contact.name})

			})
				.then((r) =>{
			
					if (r.ok) {
						r.json().then((data) =>{if(conversations !== [...conversations, data]){setConversations([...conversations, data])}});
					
				const filteredName = conversations.filter(el => el.name.toLowerCase().includes(contact.name.toLowerCase()))  ;

					fetch(`/user_conversations`, {
						method: "POST",
						headers: {
						"Content-Type": "application/json",
						},
						body: JSON.stringify({"conversation_id": parseInt(filteredName.id),
							
												"user_id": parseInt(contact.id)})
			
					})
						.then((r) => r.json())
						.then((data) =>{if(userConversations !== [...userConversations, data]){setUserConversations([...userConversations, data])}})

					
					}
						
					
					
					else{
						if(conversations !== [...conversations]){setConversations([...conversations])}
					}})


			

			
		}

	
	
	console.log(messages)
	console.log(chatList)
	
    
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
        		<Route exact path="/home" element={<Home messages={messages} handleNewMessageOnClick={handleNewMessageOnClick}/>}  />
				< Route exact path = "/signup" element={<Signup />} />
				< Route exact path = "/" element={<Login />} />
				< Route exact path = "/contacts" element={<Contacts handleOnClick={handleOnClick}/>} />
				< Route exact path = "/chat_list" element={<ChatList  chatList={messages} allMessages={allMessages} handleButtonOnClick={handleButtonOnClick}/>} />
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


