import { useState, useEffect } from "react";
import {  useContext } from "react";
import UserContext from "./UserContext";

function ChatDetail({chat, allMessages,handleButtonOnClick}) {
    const [users, setUsers] = useState();
    const [getId, setGetId] = useState([]);
    const {content_data, created_at,conversation_id} = chat
	const {currentUser} = useContext(UserContext)


   const oneMessage = [...allMessages].filter((message) => {
    return (message.user_id !== currentUser.id && message.conversation_id === conversation_id)
   })

    useEffect(()=>{

        fetch(`users`)
        .then(res=>res.json()).then(data =>setUsers(data))

        setGetId(oneMessage[0].user_id)


    }, [])
           
         

    return (
     
        
    
            <div >
                <h4>CONVERSATION ID: {conversation_id} PARTICIPANT: {users[getId].name}</h4>
                <img src={users[getId].avatar} alt={users[getId].name}/>
                <p>{created_at} {content_data}</p>
            <section>
                <button className="primary" onClick={()=>handleButtonOnClick(chat)} >ChatRoom</button>
          </section>
          </div>
        
  
   
    );
  }
  export default ChatDetail;