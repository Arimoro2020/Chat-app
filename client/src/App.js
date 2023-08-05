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

const formOutline = {id: null, content_type:"", content_data: "", created_at: null, conversation_id: null, user_id: null,
		}
	



function App() {
	const [allMessages, setAllMessages] = useState([]);
	const [conversations, setConversations] = useState([]);
	const [userConversations, setUserConversations] = useState([]);
	const [messages, setMessages] = useState([]);
	const [received, setReceived] = useState([]);
	const [filteredChatRoom, setFilteredChatRoom] = useState([]);
	const [chatsRoom, setChatsRoom] = useState(filteredChatRoom);
	const [isEditing, setIsEditing] = useState(false)
	const [newId, setNewId] = useState(null)
	const [formBody, setFormBody] = useState(formOutline)

	
	
	
	// const [chatMate, setChatMate] = useState("");

	const {currentUser, setCurrentUser} = useContext(UserContext);

 
    // const [editBody, setEditBody] = useState("")
   
    

	const navigate = useNavigate();


	// useEffect(() =>{

	// 	setChatsRoom(filteredChatRoom)

	// 	}, [filteredChatRoom]);
	
	useEffect(() => {



		fetch(`/user_conversations`)
			.then((res) => res.json())
			.then(data =>{
				if(userConversations !== data){setUserConversations(data)}});
		fetch(`/conversations`)
			.then((res) => res.json())
			.then(data =>{
				if(conversations !== data){setConversations(data)}});
	
		fetch(`/messages`)
			.then((res) => res.json())
			.then(data =>{
				if(allMessages !== data){setAllMessages(data)}});
		getList();
				
		
	if(chatsRoom !== filteredChatRoom ){setChatsRoom(filteredChatRoom)}
	
	
	},[]);

	const getList = () => {	
		const  getMessages = [...allMessages].filter((message) => {
			return (parseInt(message.user_id) === currentUser.id)})

			if(messages !== getMessages){
				setMessages(getMessages)};

			
			const filteredConversationsId = [...userConversations].filter((el)=>{
				return (el.user.name === currentUser.name)}).map((another)=>parseInt(another.conversation.id));
			
			console.log(filteredConversationsId)	
			

			const incomingMessages = [...allMessages].filter(incoming=>{
			return (filteredConversationsId.includes(parseInt(incoming.conversation_id)) && (parseInt(incoming.user_id) !== currentUser.id))})
			console.log(incomingMessages)
			if(received !== incomingMessages){
				setReceived(incomingMessages)};
	}
		
		
	function handleNewMessageOnClick(fresh){
		

		const filteredData = [...allMessages].filter((el)=>fresh && parseInt(el.conversation_id) === parseInt(fresh.conversation_id));
		if (filteredData !== filteredChatRoom){
			setFilteredChatRoom(filteredData)}
		 	
		// navigate("/chat_room")}
		
		
	
			
			
		}


	function handleMessageOnClick (fresh){
		
		const filteredData = [...allMessages].filter((el)=>fresh && parseInt(el.conversation_id) === parseInt(fresh.conversation_id));
		if (filteredData !== filteredChatRoom){
			setFilteredChatRoom(filteredData);
		}

	}

	


	function handleOnClickButton(chat){
		setIsEditing(isEditing=>!isEditing);
		if(parseInt(newId) !== parseInt(chat.id)){setNewId(parseInt(chat.id));
		console.log(newId)};
	}


	function handleOnChange(e){
		
			setFormBody({...formBody, [e.target.name]: e.target.value});
	}

	function handleFormSubmit(e) {
		e.preventDefault();
			if (isEditing) {
				
				fetch(`/messages/${parseInt(newId)}`, {
					method: "PATCH",
					crossDomain: true,
					headers: {
						"content-type": "application/json",
						Accept: "application/json",
						"Access-control-Allow-Origin":"*",
					},
					body: JSON.stringify(formBody),
				})
					.then((r) => r.json())
					.then(() =>{
						if(formBody !== ""){setFormBody("")};
						setIsEditing(isEditing=>!isEditing)
						setNewId(null);
					})
					.catch(console.error);
		
			}
			else{
				fetch("/messages", {
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
						const data = [...messages, update];
						if(messages !== data){setMessages(data)};
							if(formBody !== ""){setFormBody("")}	
								
				})
	}}
		

		function handleOnDelete(chat){
			fetch(`/messages/${parseInt(chat.id)}`, {
				method: "DELETE",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",},
			});

			const removedDeleted = [...messages].filter(message => parseInt(message.id) !== parseInt(chat.id));
			if(messages !== removedDeleted){
				setMessages(removedDeleted)}; 
		}

		function handleOnClick(contact){
			
			fetch(`/conversations`, {
				method: "POST",
				crossDomain: true,
				headers: {
					"content-type": "application/json",
					Accept: "application/json",
					"Access-control-Allow-Origin":"*",
				},
				body: JSON.stringify({"conversation_name": contact.name})

			})
				.then((r) =>{
			
					if (r.ok) {
						r.json().then((data) =>{ 
							const newData = [...conversations, data];
							if(conversations !== newData){setConversations(newData)}});
					
				const filteredName = conversations.filter(el => el.name.toLowerCase().includes(contact.name.toLowerCase()))  ;

					fetch(`/user_conversations`, {
						method: "POST",
						crossDomain: true,
						headers: {
							"content-type": "application/json",
							Accept: "application/json",
							"Access-control-Allow-Origin":"*",
						},
						body: JSON.stringify({"conversation_id": parseInt(filteredName.id),
							
												"user_id": parseInt(contact.id)})
			
					})
						.then((r) => r.json())
						.then((data) =>{
							const newData = [...userConversations, data];
							if(userConversations !== newData){setUserConversations(newData)}})

					
					}
						
					
					
					else{ const newData = [...conversations];
						if(conversations !== newData){setConversations(newData)}
					}})


			

			
		}
	
	

	
	
	
	console.log(messages)
	console.log(allMessages)
	console.log(received)
	console.log(filteredChatRoom)
	console.log(chatsRoom)
	console.log(isEditing)
	console.log(newId)
	
    
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
				< Route exact path = "/chat_list" element={<ChatList  messages={messages}  handleMessageOnClick={handleMessageOnClick}/>} />
				< Route exact path = "/chat_room" element={<ChatRoom   chatsRoom={chatsRoom} 
					handleFormSubmit={handleFormSubmit} formBody={formBody} handleOnChange={handleOnChange}
					handleOnDelete={handleOnDelete} handleOnClickButton={handleOnClickButton} isEditing={isEditing}/>} />
				< Route exact path = "/user_profile" element={<UserProfile />} />
			</Routes>
		</div>
		
	);
}


export default App;


