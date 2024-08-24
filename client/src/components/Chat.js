import React, { useEffect, useState } from 'react'
import ChatFooter from './ChatFooter.js';
import ChatBody from './ChatBody.js';

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [isOpen,setIsOpen]=useState(false);

  const openChat = () => {
    const chatObj = document.getElementById('chat');
    console.log(chatObj);
    if(isOpen){
      setIsOpen(false);
      chatObj.classList.add('hide');
      chatObj.style.width='0px';
   
    }else{
      setIsOpen(true);
      chatObj.classList.remove('hide');
      chatObj.style.width='400px';
     
    }
  }

  useEffect(() => {
    socket.on('AllMessages', (data) => {
      console.log(data);
      setMessages(data.AllMessages);
    })
  })

  return (<>
    <button onClick={openChat} id='open-chat-btn'>Open Chat</button>
    <div className='chat hide' id='chat'>
      <ChatBody messages={messages} />
      <ChatFooter socket={socket} messages={messages} />
    </div>
  </>
  )
}


export default Chat