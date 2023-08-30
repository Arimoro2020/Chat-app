
import {  useContext } from "react";
import UserContext from "./UserContext";



function Home({received, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)

	

	

    
	
    const mappedIncoming = received && [...received].map((freshNew) => {
        return (

	
	<div key={freshNew.id}>
	<h4>{freshNew.created_at} From: {freshNew.user.name}</h4><img src={freshNew.user.avatar} alt={freshNew.user.name} width={50} />
	<h4>Conversation Name: {freshNew.conversation.conversation_name}</h4>
	<p>{freshNew.content_data}</p>
	<button className="Contacts" freshNew={freshNew} onClick={() => handleNewMessageOnClick(freshNew)}>
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