

// import{HashLink as Link} from "react-router-hash-link";


function ChatRoom({chatsRoom}){
 




    const roomChats = chatsRoom && chatsRoom.map((chat)=> {
        return(  
       
              <div id={parseInt(chat.id)}>
                <h2>Conversation Name: {chat.conversation.conversation_name}</h2>
                <h4>{chat.created_at}  {chat.user.name}</h4><img src={chat.user.avatar} alt={chat.user.name} width={30} />
                <p>{chat.content_data}</p>
                {/* <Link to="#editForm" smooth> */}
                <button >
                <span role="img" aria-label="edit">
                    Edit
                </span>
                </button>
                {/* </Link> */}
                <button >
                    <span role="img" aria-label="delete">
                    🗑
                    </span>
                </button>
                </div>
      
               
        )})
      


    return (
        <div>
       
        <section>
        
        <ul>{roomChats}</ul>
           
      
        </section>
        {/* <section>
        <form className="new-message" id="editForm" onSubmit={()=>handleFormSubmit(formBody)}>
        <input
            type="text"
            name="formBody"
            autoComplete="off"
            value={formBody}
            onChange={(e) => handleOnChange(e)}/>
        <button type="submit">Send</button>
        </form>
        </section> */}
        </div>
    )
};

export default ChatRoom;