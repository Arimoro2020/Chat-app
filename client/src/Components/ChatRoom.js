
import { useContext} from "react";
import UserContext from "./UserContext";
import{HashLink as Link} from "react-router-hash-link";


function ChatRoom({chatRoom, chatMate, formBody, handleFormSubmit, 
                    handleOnClickButton, handleOnChange, handleOnDelete}){

	const {currentUser} = useContext(UserContext)

    const chatMatInfo = fetch(`/users/${chatMate.name}`)
  
  

    const roomChats = chatRoom.map((chat)=> {
        return  (<div key={chat.id} id={chat.id}>
                <h4>{ new Date(chat.created_at).toLocaleTimeString()}</h4>
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
            <h3>{chatMate.name} </h3>  
          <img>src={chatMatInfo.avatar} alt={chatMatInfo.name}</img>  
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
            onChange={(e) => handleOnChange(e)}/>
        <button type="submit">Send</button>
        </form>
        </section>
        </div>
    )
};

export default ChatRoom;