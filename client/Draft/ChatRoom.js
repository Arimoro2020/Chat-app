
import { useContext} from "react";
import UserContext from "../Components/UserContext";
import {useEffect, useState} from "react";
import{HashLink as Link} from "react-router-hash-link";
// import {v4} from "uuid";

function ChatRoom({chatRoom, mateId,formBody, handleFormSubmit, 
                    handleOnClickButton, handleOnChange, handleOnDelete}){

    const [mate, setMate] = useState();

	const {currentUser} = useContext(UserContext);

    useEffect(() =>{
        fetch(`/users/${parseInt(mateId)}`).then(res=>res.json())
        .then(data =>{
            if(mate !== data){setMate(data)}});

    }, [mateId,handleOnClickButton,mateId])

    
   
  
  

    const roomChats = chatRoom.map((chat)=> {
        return(  
        <ul key={parseInt(chat.id)}>
              <div id={parseInt(chat.id)}>
              <section>

              <h3>{currentUser.name } </h3> 
              if (currentUser.id !== parseInt(chat.user_id) &&( mate === true) ){
               <img src={mate.avatar} alt={mate.name}/>} 
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