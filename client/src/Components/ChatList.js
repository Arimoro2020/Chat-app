
import {  useContext } from "react";
import UserContext from "./UserContext";
import { ReactComponent as YourSvg } from '/Users/yemiarimoro/Development/code/My-App/Chat-app/client/src/chat.svg';



function ChatList({messages, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)
	
    const mappedSending = messages && [...messages].sort((a, b) => b.created_at.localeCompare(a.created_at)).map((fresh) => {
        return (

			<div key={fresh.id}>
			<h4>{fresh.created_at} From: {fresh.user.name}</h4><img src={fresh.user.avatar} alt={fresh.user.name} width={50} />
			<h4>Conversation Name: {fresh.conversation.conversation_name}</h4>
			<em>{fresh.content_data}</em><span role="img">
				<YourSvg width={ "30px"}  fresh={fresh} 
				onClick={() => handleNewMessageOnClick(fresh)}/></span>
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
