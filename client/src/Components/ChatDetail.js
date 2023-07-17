import { useState, useEffect } from "react";

function ChatDetail({chat, handleButtonOnClick}) {
    const [user, setUser] = useState()

    useEffect(()=>{

        fetch(`users/${parseInt(chat.user_id)}`)
        .then(res=>res.json()).then(data =>setUser(data))
    }, [])


    return (
     
        
    
            <div >
                <p>Name: {user.conversation_name}</p>
                <img src={user.avatar} alt={user.name}/>
            <section>
                <button className="primary" onClick={()=>handleButtonOnClick(chat)} >ChatRoom</button>
          </section>
          </div>
        
  
   
    );
  }
  export default ChatDetail;