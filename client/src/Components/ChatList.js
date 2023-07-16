import ChatDetail from "./ChatDetail";

function ChatList({chatList, handleButtonOnClick}) {

    return (
      <div className="chat_list">
        <ul>
          {chatList.map(chat =>{
          return(
          <div>
             <ChatDetail key={chatList.conversation_id} chat={chat} handleButtonOnClick={handleButtonOnClick}></ChatDetail>
          </div>) })}        
        </ul>
      </div>
      
    );
  }
  
 export default ChatList;