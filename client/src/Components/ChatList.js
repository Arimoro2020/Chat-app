import ChatDetail from "./ChatDetail";

function ChatList({chatList, handleButtonOnClick}) {

    return (
      <div>
        <ul>
          {chatList.map(chat =>
            <ChatDetail key={chatList.content_data} chat={chat}
                           handleButtonOnClick={handleButtonOnClick}/>)}        
        </ul>
      </div>
      
    );
  }
  
 export default ChatList;