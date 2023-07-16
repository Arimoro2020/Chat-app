

function ChatDetail({chat, handleButtonOnClick}) {



    const user =fetch(`users/${parseInt(chat.user_id)}`);

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