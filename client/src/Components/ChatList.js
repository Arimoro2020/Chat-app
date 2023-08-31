
import {  useContext } from "react";
import UserContext from "./UserContext";



function ChatList({messages, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)
	
    const mappedSending = messages && [...messages].sort((a, b) => b.created_at.localeCompare(a.created_at)).map((fresh) => {
        return (

			<div key={fresh.id}>
			<h4>{fresh.created_at} From: {fresh.user.name}</h4><img src={fresh.user.avatar} alt={fresh.user.name} width={50} />
			<h4>Conversation Name: {fresh.conversation.conversation_name}</h4>
			<p>{fresh.content_data}</p>
			<button className="Contacts" fresh={fresh} onClick={() => handleNewMessageOnClick(fresh)}>
				Go to ChatRoom</button>
			</div>)

		})
    
 
	return (
		<div>
			 <section> 
				<h1>Welcome, {currentUser.name} to your Chat App</h1>
			</section>
            <section>
				<h2> Here are your sent messages!</h2>
				<ul>{mappedSending}</ul>
			
            </section>
		</div>
	);
	
}
export default ChatList
