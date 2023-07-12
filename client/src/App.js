import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
// import ChatContainer from "./components/ChatContainer";
// import ChatList from "./components/ChatList";
// import ChatRoom from "./components/ChatRoom";
// import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
// import Search from "./components/Search";
// import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";

/*
authorization:
component mounts -> 
run useEffect -> 
getUser -> 
make fetch /authorized session ->
if user found, update user state
*/

/*
sign up:
onSubmit formik form ->
POST /users ->
enter into database ->
hash password (bcrypt.generate_password_hash) -> 
update sessions ->
return user to React -> 
update user state
*/

/*
login:
onSubmit formik form (which is also sign up's form) ->
POST /login ->
query database for user -> 
if found -> 
check if password is correct (bcrypt.check_password_hash()) -> 
update sessions -> 
return user to React ->
update user state
*/

/*
logout:
on button click -> 
fetch /logout ->
clear sessions ->
send back empty response to React ->
set user state to null
*/



function App() {
	const [conversations, setConversations] = useState([]);
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState(null)
	
	useEffect(() => {
		fetch("http://localhost:5555/conversations")
			.then((res) => res.json())
			.then(data => setConversations([...conversations, data]));
		fetch("http://localhost:5555/messages")
			.then((res) => res.json())
			.then(data => setMessages([...messages, data]));
		fetch("http://localhost:5555/check_session")
			.then((res)=> {if (res.ok) {
				res.json()
			.then((data)=> setUser(data))}});
		
	
	}, []);

								
							
		
	const updateUser = (user) => {
		setUser(user)
	}
	

	
	
	
	
	// here is what we render if there is no user
	if (!user){
		return (
			<div className="Chat App">
				<Navigation updateUser={updateUser} user={user} />
				<Login updateUser={updateUser} user={user}/>
			</div>
		)
	}
	return (
		<div className="Chat App">
			<Navigation updateUser={updateUser} user={user} />
			<Routes>
        		<Route exact path="/home" element={<Home messages={messages} user={user}/>} />
				< Route exact path = "/signup" element={<Signup updateUser={updateUser} user={user} />} />
			</Routes>
		</div>
	);
}

export default App;

