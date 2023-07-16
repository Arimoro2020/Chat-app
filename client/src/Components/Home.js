
import {  useContext } from "react";
import UserContext from "./UserContext";
import {v4} from "uuid"
import IncomingDetail from "./IncomingDetail";


function Home({incoming, handleNewMessageOnClick}) {


	const {currentUser} = useContext(UserContext)

	

	

    
	

	
    
 
	return (
		<div>
			 <section> 
				<h1>Welcome, {currentUser.name} to your Chat App</h1>
			</section>
            <section>
				<h2> Here are your messages</h2>
			<ul> 
	
		 {incoming.map((fresh) => (
          <IncomingDetail
            key={v4()}
            fresh={fresh}
			handleNewMessageOnClick={handleNewMessageOnClick}
          />
        ))}
			</ul>
            </section>
		</div>
	);
	
}


export default Home;