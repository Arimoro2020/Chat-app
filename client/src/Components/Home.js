
import { useContext } from "react";
import UserContext from "./UserContext";

function Home({incoming, handleNewMessageOnClick}) {

	const {user} = useContext(UserContext)

	const {id, content_data, conversation_id, user_id, created_at} = incoming;

	const sender = fetch(`/users/${user_id}`).then(res=>res.json())

    
	

	
    
    const newMessages = incoming.map(fresh=>{
		return		(<li >
					<div key={conversation_id} id={id} fresh={fresh} sender={sender}>
					<img> src={sender.avatar} alt={sender.name}</img>
					<h4>{ new Date(created_at).toLocaleTimeString()}  {sender.name}</h4>
					<p>{content_data}</p>
					<button className="Contacts" id={id} fresh={fresh} sender={sender} onClick={() => handleNewMessageOnClick(fresh, sender)}>
						Go to ChatRoom</button>
					</div>
				</li>)
				.sort((a, b) => a.created_at.localeCompare(b.created_at))});

	return (
		<div>
			 <section> 
				<h1>Welcome, {user.name} to your Chat App</h1>
			</section>
            <section>
				<h2> Here are your messages</h2>
			<ul>
				
			{newMessages}
            
			</ul>
            </section>
		</div>
	);
	
}


export default Home;