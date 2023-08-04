
import {  useContext } from "react";
import UserContext from "./UserContext";



function Home({received, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)

	

	

    
	
    const mappedIncoming = received.map((fresh) => {
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
				<h2> Here are your received Messages!</h2>
				<ul>{mappedIncoming}</ul>
			
            </section>
		</div>
	);
	
}


export default Home;