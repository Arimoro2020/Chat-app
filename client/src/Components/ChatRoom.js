
import { useContext, useState} from "react";
import UserContext from "./UserContext";
import{HashLink as Link} from "react-router-hash-link";


function ChatRoom({chatRoom, chatMate, formBody, handleFormSubmit, 
                    handleOnClickButton, handleOnChange, handleOnDelete}){

    const [chatMateInfo, setChatMateInfo] = useState(null)

	const {currentUser, setCurrentUser} = useContext(UserContext)

    fetch(`/users/${chatMate}`).then(res=>res.json()).then(data=>setChatMateInfo(data))
  
  

    const roomChats = chatRoom.map((chat)=> {
        return  (<div key={chat.id} id={chat.id}>
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
                </div>) 
               
                })
      


    return (
        <div>
        <section>
            <h3>{chatMateInfo.name} </h3>  
          <img src={chatMateInfo.avatar} alt={chatMateInfo.name}/>  
        </section>
        <section>
        <li>
        {roomChats}
           
        </li>
        </section>
        <section>
        <form className="new-message" id="editForm" onSubmit={()=>handleFormSubmit(formBody)}>
        <input
            type="text"
            name="formBody"
            autoComplete="off"
            value={formBody}
            onChange={(e) => handleOnChange}/>
        <button type="submit">Send</button>
        </form>
        </section>
        </div>
    )
};

export default ChatRoom;