
import {  useContext } from "react";
import UserContext from "./UserContext";



function ChatList({messages, handleMessageOnClick}) {


	const {currentUser} = useContext(UserContext)

	

	

    
	
    const mappedSending = messages.map((fresh) => {
        return (

	<div key={fresh.id}>
	<h4>{fresh.created_at}</h4>
	<h4>Conversation Name: {fresh.conversation.conversation_name}</h4>
	<p>{fresh.content_data}</p>
	<button className="Contacts" fresh={fresh} onClick={() => handleMessageOnClick(fresh)}>
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
