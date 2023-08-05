
import {  useContext } from "react";
import UserContext from "./UserContext";



import{HashLink as Link} from "react-router-hash-link";


function ChatRoom({chatsRoom, handleFormSubmit, handleOnChange, formBody, handleOnDelete, isEditing, handleOnClickButton}){
 
    // console.log(formBody);
    const chatName = chatsRoom && [...chatsRoom].map((el)=>el.conversation.conversation_name)[0];
    const {currentUser} = useContext(UserContext)

    const roomChats = chatsRoom && chatsRoom.map((chat)=> {
        return(  
       
              <div key= {chat.id} id={parseInt(chat.id)}>
                <h4>{chat.created_at}  {chat.user.name}</h4><img src={chat.user.avatar} alt={chat.user.name} width={30} />
                <p>{chat.content_data}</p>
                {currentUser.id === chat.user_id?
                <button type="button" className="edit" chat={chat} onClick={()=>handleOnClickButton(chat)}>
                <Link  to="#editForm" smooth  >
                <span role="img" aria-label="edit">
                    {isEditing ? "stopEdit" : "edit"}
                </span>
                </Link>
                </button> 
                : null}
              
                <button chat={chat} onClick={() =>handleOnDelete(chat)}>
                    <span role="img" aria-label="delete">
                    🗑
                    </span>
                </button >
                </div>
      
               
        )})
      


    return (
        <div>
       <h2>Conversation Name: {chatName}</h2>
        <section>
        
        <ul>{roomChats}</ul>
           
      
        </section>
        <section>
        <form className="new-message" id="editForm" onSubmit={(e)=>handleFormSubmit(e)}>
        <textarea 
            type="text"
            name="content_data"
            autoComplete="off"
            value={formBody.content_data}
            onChange={(e) => handleOnChange(e)}/>
        <button type="submit">Send</button>
        </form>
        </section>
        </div>
    )
};

export default ChatRoom;