
import { useContext, useState, useEffect} from "react";
import UserContext from "./UserContext";
import{HashLink as Link} from "react-router-hash-link";
import {v4} from "uuid";

function ChatRoom({chatRoom, chatMate, formBody, handleFormSubmit, 
                    handleOnClickButton, handleOnChange, handleOnDelete}){

    const [chatMateInfo, setChatMateInfo] = useState(null)

	const {currentUser, setCurrentUser} = useContext(UserContext)

    useEffect(()=>{
        fetch(`/users/${chatMate}`).then(res=>res.json())
        .then(data=>{if(chatMateInfo !== data){setChatMateInfo(data)}})
    },[])

   
  
  

    const roomChats = [...chatRoom].map((chat)=> {
        return(  
        <ul key={v4()}>
              <div id={chat.id}>
                <h4>{ chat.created_at}</h4>
                <p>{chat.content_body}</p>
                <Link to="#editForm" smooth>
                <button onClick={() => handleOnClickButton(chat)}>
                <span role="img" aria-label="edit">
                    Edit
                </span>
                </button>
                </Link>
                <button onClick={()=>handleOnDelete(chat)}>
                    <span role="img" aria-label="delete">
                    🗑
                    </span>
                </button>
                </div>
            </ul>)
               
                })
      


    return (
        <div>
        <section>
            <h3>{chatMateInfo.name} </h3>  
          <img src={chatMateInfo.avatar} alt={chatMateInfo.name}/>  
        </section>
        <section>
        
        {roomChats}
           
      
        </section>
        <section>
        <form className="new-message" id="editForm" onSubmit={()=>handleFormSubmit(formBody)}>
        <input
            type="text"
            name="formBody"
            autoComplete="off"
            value={formBody}
            onChange={(e) => handleOnChange(e)}/>
        <button type="submit">Send</button>
        </form>
        </section>
        </div>
    )
};

export default ChatRoom;