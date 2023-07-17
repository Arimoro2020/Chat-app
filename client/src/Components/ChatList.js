import ChatDetail from "./ChatDetail";

function ChatList({chatList, allMessages,handleButtonOnClick}) {

          



    return (
      <div>
        <ul>
        {chatList.map(chat =>
  <ChatDetail key={chatList.content_data} chat={chat}
                   handleButtonOnClick={handleButtonOnClick} allMessages={allMessages}/>)}     

        </ul>
      </div>
      
    );
  }
  
 export default ChatList;