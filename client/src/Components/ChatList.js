import ChatDetail from "./ChatDetail";

function ChatList({chatList, handleButtonOnClick}) {

    return (
      <div>
      
          {[...chatList].map(chat =>
            <ChatDetail key={chatList.content_data} chat={chat}
                           handleButtonOnClick={handleButtonOnClick}/>)}        
        
      </div>
      
    );
  }
  
 export default ChatList;