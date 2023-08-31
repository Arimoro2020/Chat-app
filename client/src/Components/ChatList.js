
import {  useContext } from "react";
import UserContext from "./UserContext";
import { ReactComponent as YourSvg } from '/Users/yemiarimoro/Development/code/My-App/Chat-app/client/src/chat.svg';



function ChatList({messages, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)
	
    const mappedSending = messages && [...messages].sort((a, b) => b.created_at.localeCompare(a.created_at)).map((fresh) => {
        return (

			<div key={fresh.id}   style={{
				width: 500,
				flex: 1,
				backgroundColor: 'ghostWhite',
			  }}>
			<h3 style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', color:"steelBlue",}}>{fresh.created_at} From: {fresh.user.name}</h3>
			<h4 style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', color:"steelBlue",}}>Conversation Name: {fresh.conversation.conversation_name}</h4>
			<img src={fresh.user.avatar} alt={fresh.user.name} width={50} />
			<em style={{fontSize: 15}}>{fresh.content_data}</em>
			<div style={{alignContent:"flex-end"}}>
			<span role="img" style={{alignContent:"flex-end"}}>
				<YourSvg width={ "20px"}  fresh={fresh} 
				onClick={() => handleNewMessageOnClick(fresh)}/></span>
			</div>
		
			</div>)

		})
    
 
	return (
		<div >
			 <section > 
				<h2  style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>{currentUser.name}, here are your sent messages:</h2>
				
			</section>
            <section style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
				<ul>{mappedSending}</ul>
			
            </section>
		</div>
	);
	
}
export default ChatList
