
import {  useContext } from "react";
import UserContext from "./UserContext";
// import {v4} from "uuid"
// import IncomingDetail from "./IncomingDetail";


function Home({messages, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)

	

	

    
	
    const mappedIncoming = messages.map((fresh) => {
        return (

	<div key={fresh.id}>
	<h4>{fresh.created_at}</h4>
	<h4>ID: {fresh.conversation_id}</h4>
	<p>{fresh.content_data}</p>
	<button className="Contacts" onClick={() => handleNewMessageOnClick(fresh)}>
		Go to ChatRoom</button>
	</div>)

		})
    
 
	return (
		<div>
			 <section> 
				<h1>Welcome, {currentUser.name} to your Chat App</h1>
			</section>
            <section>
				<h2> Here are your messages</h2>
				<ul>{mappedIncoming}</ul>
			
            </section>
		</div>
	);
	
}


export default Home;