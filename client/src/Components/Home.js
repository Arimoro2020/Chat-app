
import { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import { v4 } from 'uuid';

function Home({incoming, handleNewMessageOnClick}) {

	const [sender, setSender] = useState({})

	const {currentUser} = useContext(UserContext)

	const {user_id,} = incoming;

	useEffect(()=>{
		fetch(`/users/${parseInt(user_id)}`)
		.then(res=>res.json())
		.then(data=>setSender(data));


	}, [])
	

    
	

	
    
    const newMessages = incoming.map(fresh=>{
			return(	<>
						<li key={v4()}>
						<img src={sender.avatar} alt={sender.name}/>
						<h4>{fresh.created_at}  {sender.name}</h4>
						<p>{fresh.content_data}</p>
						<button className="Contacts" onClick={() => handleNewMessageOnClick(fresh, sender)}>
							Go to ChatRoom</button>
						</li></>
				
				)});

	return (
		<div>
			 <section> 
				<h1>Welcome, {currentUser.name} to your Chat App</h1>
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