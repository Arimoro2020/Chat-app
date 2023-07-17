
import { useContext} from "react";
import UserContext from "./UserContext";
import{HashLink as Link} from "react-router-hash-link";
// import {v4} from "uuid";

function ChatRoom({chatRoom,formBody, handleFormSubmit, 
                    handleOnClickButton, handleOnChange, handleOnDelete}){

    

	const {currentUser} = useContext(UserContext)

    
   
  
  

    const roomChats = [...chatRoom].map((chat)=> {
        return(  
        <ul key={chat.id}>
              <div id={chat.id}>
              <section>

              <h3>{currentUser.name } </h3>  
               <img src={chat.avatar} alt={currentUser.name}/>  
              </section>
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