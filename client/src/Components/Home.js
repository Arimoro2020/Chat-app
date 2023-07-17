
import {  useContext } from "react";
import UserContext from "./UserContext";
// import {v4} from "uuid"
// import IncomingDetail from "./IncomingDetail";


function Home({incoming, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)

	

	

    
	
    const mappedIncoming = [...incoming].map((fresh) => {
        return (

	<ul>
	<h4>{fresh.created_at}</h4>
	<p>{fresh.content_data}</p>
	<button className="Contacts" onClick={() => handleNewMessageOnClick(fresh)}>
		Go to ChatRoom</button>
	</ul>)

		})
    
 
	return (
		<div>
			 <section> 
				<h1>Welcome, {currentUser.name} to your Chat App</h1>
			</section>
            <section>
				<h2> Here are your messages</h2>
			{mappedIncoming}
            </section>
		</div>
	);
	
}


export default Home;