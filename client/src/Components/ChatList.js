

function ChatList({chatList, handleButtonOnClick}) {

    return (
      <div className="chat_list">
        <ul>
          {chatList.map((chat) => (
            <div key={chat.id} id={chat.id}>
                <p>Name: {chat.conversation_name}</p>
            <section>
                <button className="primary" onClick={()=>handleButtonOnClick(chat)} >ChatRoom</button>
          </section>
          </div>
          ))}
  
        </ul>
      </div>
      
    );
  }
  export default ChatList;