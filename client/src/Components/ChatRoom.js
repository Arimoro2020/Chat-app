
import { useContext} from "react";
import UserContext from "./UserContext";

function ChatRoom({chatRoom, chatMate, formBody, handleFormSubmit, 
                    handleOnClickButton, handleOnChange, handleOnDelete}){

	const {user} = useContext(UserContext)

    const chatMatInfo = fetch(`/users/${chatMate.name}`)
  
  

    const roomChats = chatRoom.map((chat)=> {
        return  (<div key={chat.id} id={chat.id}>
                <h4>{ new Date(chat.created_at).toLocaleTimeString()}</h4>
                <p>{chat.content_body}</p>
                <button onClick={() => handleOnClickButton(chat)}>
                <span role="img" aria-label="edit">
                </span>
                </button>
                <button onClick={()=>handleOnDelete(chat)}>
                    <span role="img" aria-label="delete">
                    🗑
                    </span>
                </button>
                </div>) 
                .sort((a, b) => b.chat.created_at.localeCompare(a.chat.created_at)) 
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
        <form className="new-message" onSubmit={()=>handleFormSubmit(formBody)}>
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