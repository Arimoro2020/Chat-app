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
	const [received, setReceived] = useState([]);
	const [chatRoom, setChatRoom] = useState();
	const [mateId, setMateId] = useState([]);
	// const [chatMate, setChatMate] = useState("");
	const [allMessages, setAllMessages] = useState([]);
	
	const [currentUser, setCurrentUser ] = useState({"id": 4, "name": "Mel Needle",
	"username": "summer", "background": "Reveal former skill listen.", 
	"online_status": "online", "Busy": "2023-07-17 16:49:42", "avatar": "https://img.freepik.com/free-photo/worldface-british-guy-white-background_53876-14467.jpg"})

    const [formBody, setFormBody] = useState("")
    // const [editBody, setEditBody] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [newId, setNewId] = useState(null)

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
			return (parseInt(message.user_id) === currentUser.id)})

			if(messages !== getMessages){
				setMessages(getMessages)};

			
			const filteredConversations = [...userConversations].filter((el)=>{
				return (parseInt(el.user_id )=== currentUser.id)}).map((another)=>parseInt(another.conversation_id));

			

			const incomingMessages = [...allMessages].filter(incoming=>{
			return (filteredConversations.includes(parseInt(incoming.conversation_id)) && (parseInt(incoming.user_id) !== currentUser.id))})
			
			if(received !== incomingMessages){
				setReceived(incomingMessages)};
	}
		
		
	function handleNewMessageOnClick(fresh){
		

		const filteredChatRoom = [...allMessages].filter((el)=>parseInt(el.conversation_id) === parseInt(fresh.conversation_id));
			
			if (chatRoom !== filteredChatRoom){
			setChatRoom(filteredChatRoom)};
			if (parseInt(fresh.user_id) !== currentUser.id){
				if(mateId !== parseInt(fresh.user_id)){
					setMateId(parseInt(fresh.user_id))
				}
			}
			navigate("/chat_room");
			
		

		}



		function handleOnClickButton(chat){
			setIsEditing(isEditing=>!isEditing);
			if(formBody !== chat.content_body){
				setFormBody(chat.content_body)};
			if(parseInt(newId) !== parseInt(chat.id)){setNewId(parseInt(chat.id))}
		}
		function handleOnChange(e){
			if(formBody !== e.target.value){
			setFormBody(e.target.value)};
		}

		function handleFormSubmit(e) {
			e.preventDefault();
				if (isEditing) {
			
					fetch(`/messages/${parseInt(newId)}`, {
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
	console.log(received)
	console.log(chatRoom)
	
    
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
        		<Route exact path="/home" element={<Home received={received} handleNewMessageOnClick={handleNewMessageOnClick}/>}  />
				< Route exact path = "/signup" element={<Signup />} />
				< Route exact path = "/" element={<Login />} />
				< Route exact path = "/contacts" element={<Contacts handleOnClick={handleOnClick}/>} />
				< Route exact path = "/chat_list" element={<ChatList  messages={messages}  handleNewMessageOnClick={handleNewMessageOnClick}/>} />
				< Route exact path = "/chat_room" element={<ChatRoom  mateId={mateId} chatRooM={chatRoom}  formBody={formBody} 
				handleFormSubmit={handleFormSubmit} handleOnClickButton={handleOnClickButton} 
				handleOnChange={handleOnChange} handleOnDelete={handleOnDelete} mateId={mateId}/>} />
				< Route exact path = "/user_profile" element={<UserProfile />} />
			</Routes>
			</UserProvider>
		</div>
		
	);
}


export default App;


