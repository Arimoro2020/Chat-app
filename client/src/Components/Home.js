
import {  useContext } from "react";
import UserContext from "./UserContext";
import { ReactComponent as YourSvg } from '/Users/yemiarimoro/Development/code/My-App/Chat-app/client/src/chat.svg';



function Home({received, handleNewMessageOnClick}) {

	

	const {currentUser} = useContext(UserContext)

    const mappedIncoming = received && [...received].sort((a, b) => b.created_at.localeCompare(a.created_at)).map((fresh) => {
        return (

	
	<div key={fresh.id}     style={{
		width: 500,
		backgroundColor: 'skyBlue',
		flex: 1,
	  }}>
	<h3 style={{color:"steelBlue",}}>{fresh.created_at} From: {fresh.user.name}</h3>
	<h4 style={{color:"steelBlue",}}>Conversation Name: {fresh.conversation.conversation_name}</h4>
	<img src={fresh.user.avatar} alt={fresh.user.name} width={50} />
	<em style={{fontSize: 20}}>{fresh.content_data}</em><span role="img">
		<YourSvg width={ "20px"}  fresh={fresh} 
		onClick={() => handleNewMessageOnClick(fresh)}/></span>

	
	</div>)

		})
    
 
	return (
		<div >
			 <section > 
				
				<h2 style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', color:"royalBlue",}}>{currentUser.name}, here are your received Messages:</h2>

			
			</section>
            <section style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
			
				<ul >{mappedIncoming}</ul>
			
            </section>
		</div>
	);
	
}


export default Home;