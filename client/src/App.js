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
	const [conversations, setConversations] = useState([]);
	const [userConversations, setUserConversations] = useState([]);
	const [messages, setMessages] = useState([]);
	const [received, setReceived] = useState([]);
	const [chatsRoom, setChatsRoom] = useState([]);
	const [filteredChatRoom, setFilteredChatRoom] = useState([]);
	
	
	// const [chatMate, setChatMate] = useState("");
	const [allMessages, setAllMessages] = useState([]);
	const {currentUser, setCurrentUser} = useContext(UserContext);

    // const [formBody, setFormBody] = useState("")
    // const [editBody, setEditBody] = useState("")
    // const [isEditing, setIsEditing] = useState(false)
    // const [newId, setNewId] = useState(null)

	const navigate = useNavigate();


	
	
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
	
		
	
	}, []);

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
		
		
	const handleNewMessageOnClick = (fresh)=>{
		

		const filteredData = [...allMessages].filter((el)=>fresh && parseInt(el.conversation_id) === parseInt(fresh.conversation_id));
		if (filteredData !== filteredChatRoom){
			setFilteredChatRoom(filteredData)}
		 	
		// navigate("/chat_room")}
		
		
	
			
			
		}


	const handleMessageOnClick = (fresh) =>{
		
		const filteredData = [...allMessages].filter((el)=>fresh && parseInt(el.conversation_id) === parseInt(fresh.conversation_id));
		if (filteredData !== filteredChatRoom){
			setFilteredChatRoom(filteredData);
		}

	}

	useEffect(() =>{

		setChatsRoom(filteredChatRoom)

		}, [filteredChatRoom]);
		// function handleOnClickButton(chat){
		// 	setIsEditing(isEditing=>!isEditing);
		// 	if(formBody !== chat.content_body){
		// 		setFormBody(chat.content_body)};
		// 	if(parseInt(newId) !== parseInt(chat.id)){setNewId(parseInt(chat.id))}
		// }
		// function handleOnChange(e){
		// 	if(formBody !== e.target.value){
		// 	setFormBody(e.target.value)};
		// }

		// function handleFormSubmit(e) {
		// 	e.preventDefault();
		// 		if (isEditing) {
			
		// 			fetch(`/messages/${parseInt(newId)}`, {
		// 				method: "PATCH",
		// 				headers: {
		// 				"Content-Type": "application/json",
		// 				},
		// 				body: JSON.stringify({content_data: formBody}),
		// 			})
		// 				.then((r) => r.json())
		// 				.then((update) =>{ if(messages !== [...messages, update]){setMessages([...messages, update])};
		// 					if(formBody !== ""){setFormBody("")};
		// 					setIsEditing(isEditing=>!isEditing)})
			
		// 		}
		// 		else{
		// 			fetch("/messages", {
		// 				method: "POST",
		// 				headers: {
		// 				"Content-Type": "application/json",
		// 				},
		// 				body: JSON.stringify({
		// 					user_id: parseInt(currentUser.id),
		// 					content_type: "string",
		// 					content_data: formBody}),
		// 			})
		// 				.then((r) => r.json())
		// 				.then((update) =>{ if(messages !== [...messages, update]){setMessages([...messages, update])};
		// 						if(formBody !== ""){setFormBody("")}	
									
		// 			})
		// }}
		

		// function handleOnDelete(chat){
		// 	fetch(`/messages/${parseInt(chat.id)}`, {
		// 		method: "DELETE",
		// 	});

		// 	const removedDeleted = [...messages].filter(message => parseInt(message.id) !== parseInt(chat.id));
		// 	if(messages !== removedDeleted){
		// 		setMessages(removedDeleted)}; 
		// }

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
	console.log(allMessages)
	console.log(received)
	console.log(chatsRoom)
	
    
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
				< Route exact path = "/chat_room" element={<ChatRoom   chatsRoom={chatsRoom} />} />
				< Route exact path = "/user_profile" element={<UserProfile />} />
			</Routes>
		</div>
		
	);
}


export default App;


