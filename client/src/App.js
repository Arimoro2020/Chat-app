import React, { useContext } from 'react';
import UserContext from "./Components/UserContext";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Components/Home";
import ChatList from "./Components/ChatList";
import ChatRoom from "./Components/ChatRoom";
import Contacts from "./Components/Contacts";
import Navigation from "./Components/Navigation";
import UserProfile from "./Components/UserProfile";


import Login from "./Components/Login";
import Signup from "./Components/Signup";


import { useNavigate } from "react-router-dom";


	



function App() {
	const [allMessages, setAllMessages] = useState([]);
	const [conversations, setConversations] = useState([]);
	const [userConversations, setUserConversations] = useState([]);
	const [messages, setMessages] = useState([]);
	const [filteredConversationsId, setFilteredConversationsId] = useState([]);
	const [received, setReceived] = useState([]);
	const [id, setId] = useState(null);
	const [isEditing, setIsEditing] = useState(false)
	const [newId, setNewId] = useState(null)
	const [conversationData, setConversationData] = useState(null);

	const {currentUser} = useContext(UserContext);
	const formOutline = {"content_type":"String", "content_data": "","conversation_id": id, "user_id": parseInt(currentUser.id)
		}
	 const inviteForm = 	
	 conversationData && {"content_type":"String", 
		"content_data": "Hi, Let's start chatting!",
		"conversation_id": parseInt(conversationData.id), 
		"user_id": parseInt(currentUser.id)
	}
	const [formBody, setFormBody] = useState(formOutline)

	const navigate = useNavigate();

	useEffect(() => {

		fetch(`/user_conversations`)
			.then((res) => res.json())
			.then((data) =>{
				if(userConversations !== data){setUserConversations(data)}});
	},[]);


	useEffect(() =>{

		fetch(`/conversations`)
		.then((res) => res.json())
		.then((data) =>{
			if(conversations !== data){setConversations(data)}});
	
	},[]);


	useEffect(() =>{
		fetch(`/messages`)
		.then((res) => res.json())
		.then((data) =>{
			if(allMessages !== data){setAllMessages(data)}});
		getList();
	},[allMessages]);



	const getList = () => {	
		const  getMessages = [...allMessages].filter((message) => {
			return (parseInt(message.user_id) === currentUser.id)})

			if(messages !== getMessages){
				setMessages((messages)=> getMessages);

			}
			
			const filteredConversationsById = [...messages].map((another)=>parseInt(another.conversation.id));
			if(filteredConversationsId !== filteredConversationsById){setFilteredConversationsId((filteredConversationsId)=>filteredConversationsById)}

			const incomingMessages = [...allMessages].filter(incoming=>{
			return (((filteredConversationsId.includes(parseInt(incoming.conversation_id)) && (parseInt(incoming.user_id) !== currentUser.id)))
			 || ((incoming.conversation_name === currentUser.name) && (parseInt(incoming.user_id) !== currentUser.id)))});
		
			if(received !== incomingMessages){
				setReceived((received)=>incomingMessages)};
	}


	function handleNewMessageOnClick(fresh){
		
		setId((id)=>fresh.conversation_id);
		navigate("/chat_room")
			
		}


	// function handleMessageOnClick (fresh){
	// 	setId(fresh.conversation_id);
	// 	navigate("/chat_room")

	// }


	function handleOnClickButton(chat){
		setIsEditing(isEditing=>!isEditing);
		if(parseInt(newId) !== parseInt(chat.id)){setNewId((newId)=>parseInt(chat.id));
		// console.log(newId)};
	}
	}

	function handleOnChange(e){
		
			setFormBody({...formBody, [e.target.name]: e.target.value});
	}

	function handleFormSubmit(e) {
		e.preventDefault();
			isEditing ? 
				
				fetch(`http://localhost:5555/messages/${parseInt(newId)}`, {
					method: "PATCH",
					crossDomain: true,
					headers: {
						"content-type": "application/json",
						Accept: "application/json",
						"Access-control-Allow-Origin":"*",
					},
					body: JSON.stringify( {...formBody, "id":newId}),
				})
					.then((r) => r.json())
					.then(() =>{
						if(formBody.content_data !== ""){setFormBody(formOutline)};
						setIsEditing(isEditing=>!isEditing)
						setNewId(null);
					})
					.catch(console.error)
		
			
			:
				fetch("http://localhost:5555/messages", {
					method: "POST",
					crossDomain: true,
					headers: {
						"content-type": "application/json",
						Accept: "application/json",
						"Access-control-Allow-Origin":"*",
					},
					body: JSON.stringify(formBody),
				})
					.then((r) => r.json())
					.then((update) =>{ 

							// console.log(update);
							if(formBody.content_data !== ""){setFormBody(formOutline)};	
								
				})	
				.catch(console.error)
	}
		

		function handleOnDelete(chat){
			fetch(`http://localhost:5555/messages/${parseInt(chat.id)}`, {
				method: "DELETE",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",},
			});

			const removedDeleted = [...messages].filter((message) => parseInt(message.id) !== parseInt(chat.id));
			if(messages !== removedDeleted){
				setMessages((messages)=>removedDeleted)}; 
		}

		function handleOnClick(contact){
			
			fetch(`http://localhost:5555/conversations`, {
				method: "POST",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",
				},
				body: JSON.stringify({"conversation_name": contact.name})

			})
				.then((r) => r.json())
				.then((data) =>{ 
							if(data !== conversationData){setConversationData(data)}
							const newData = [...conversations, [data]];
							if(conversations !== newData){setConversations(newData)}
							
						});
					
			

			fetch(`http://localhost:5555/user_conversations`, {
				method: "POST",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",
				},
				body: JSON.stringify({"conversation_id": parseInt(conversationData.id),
					
										"user_id": parseInt(contact.id)})
	
			})
				.then((r) => r.json())
				.then((another) =>{
					const newUserData = [...userConversations, another];
					if(userConversations !== newUserData){setUserConversations(newUserData)}})

			fetch(`http://localhost:5555/messages`, {
				method: "POST",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",
				},
				body: JSON.stringify(inviteForm),
			})
				.then((r) => r.json())
				.then((update) =>{ 
					const updatedMessages = [...allMessages, [update]];
					if(allMessages !== updatedMessages){setAllMessages(updatedMessages)};	
							
			})	
			.catch(console.error)
	
	}
	


	
	

	
	// console.log(messages)
	// console.log(allMessages)
	// console.log(received)
	// console.log(conversationData)
	// console.log(id)
	// console.log(isEditing)
	// console.log(newId)
	
    
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
			<Navigation />
			<Routes>
        		<Route exact path="/home" element={<Home received={received} handleNewMessageOnClick={handleNewMessageOnClick}/>}  />
				< Route exact path = "/signup" element={<Signup />} />
				< Route exact path = "/" element={<Login />} />
				< Route exact path = "/contacts" element={<Contacts handleOnClick={handleOnClick}/>} />
				< Route exact path = "/chat_list" element={<ChatList  messages={messages}  handleNewMessageOnClick={handleNewMessageOnClick}/>} />
				< Route exact path = "/chat_room" element={<ChatRoom   id={id} 
					handleFormSubmit={handleFormSubmit} formBody={formBody} handleOnChange={handleOnChange}
					handleOnDelete={handleOnDelete} handleOnClickButton={handleOnClickButton} isEditing={isEditing}/>} />
				< Route exact path = "/user_profile" element={<UserProfile />} />
			</Routes>
		</div>
		
	);
}




export default App;


