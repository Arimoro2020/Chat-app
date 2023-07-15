import { v4 } from "uuid";

function ChatList({chatList, handleButtonOnClick}) {

    return (
      <div className="chat_list">
        <ul>
          {chatList.map((chat) => (
            <div key={v4()} id={chat.id}>
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