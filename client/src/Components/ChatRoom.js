
import {  useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";



import{HashLink as Link} from "react-router-hash-link";


function ChatRoom({id, handleFormSubmit, handleOnChange, formBody, handleOnDelete, isEditing, handleOnClickButton}){

    const [chatsRoom, setChatsRoom] = useState([])

    useEffect(() =>{
		fetch(`http://localhost:5555/messages/conversations/${parseInt(id)}`)
		.then((res) => res.json())
		.then((data) =>{
            if(chatsRoom !== data){setChatsRoom(data)}});
	},[id, chatsRoom]);
 
    // console.log(formBody);
    const chatName = chatsRoom && [...chatsRoom].map((el)=>el.conversation.conversation_name)[0];
    const {currentUser} = useContext(UserContext)

    const roomChats = chatsRoom && chatsRoom.map((chat)=> {
        return(  
       
              <div key= {chat.id} id={parseInt(chat.id)}   style={{
                width: 500,
                flex:1,
                backgroundColor: 'skyblue',
              }}>
                <h3 style={{color:"steelBlue",}}>{chat.created_at}  {chat.user.name}</h3>
                <img src={chat.user.avatar} alt={chat.user.name} width={30} />
                <em style={{fontSize: 20}}>{chat.content_data}</em>
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
        <div >
       <h3 style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', color:"royalBlue"}}>Conversation Name: {chatName}</h3>
        <section style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
        
        <ul>{roomChats}</ul>
           
      
        </section>
        <section style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
        <form className="new-message" id="editForm" onSubmit={(e)=>handleFormSubmit(e)}>
        <textarea 
            type="text"
            name="content_data"
            autoComplete="off"
            value={formBody.content_data}
            onChange={(e) => handleOnChange(e)} />
        <button type="submit">Send</button>
        </form>
        </section>
        </div>
    )
};

export default ChatRoom;