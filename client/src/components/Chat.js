import React, { useState } from 'react'
import ChatFooter from './ChatFooter.js';
import ChatBody from './ChatBody.js';

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const [isOpen,setIsOpen]=useState(false);
  const [newMsgNotification,setNewMsgNotification]=useState(false);

  const openChat = () => {
    const chatObj = document.getElementById('chat');
    if(isOpen){
      setIsOpen(false);
      chatObj.classList.add('hide');
      chatObj.style.width='0px';
      setNewMsgNotification(false);
    }else{
      setIsOpen(true);
      chatObj.classList.remove('hide');
      if(window.innerWidth>=800){
        chatObj.style.width='400px';
      }else if(window.innerWidth<800){
        const windowsize=window.innerWidth - 50;
        chatObj.style.width=`${windowsize}px`;
      }
      setNewMsgNotification(false);
    }
  }

    socket.on('AllMessages', (data) => {
      if(data.room === localStorage.getItem('room')){
        setMessages(data.AllMessages);
        socket.emit('newMsgNotification');
      }
    })

    socket.on('newMsgNotificationSet',(data)=>{
      if(data.room === localStorage.getItem('room')){
        setNewMsgNotification(true);
      }
    })


  return (<>
    <button onClick={openChat} id='open-chat-btn'>
    {newMsgNotification?
    <span id='new-notification'></span>
    : null
    }
    Chat</button>
    <div className='chat hide' id='chat'>
      <div className='chat-header'>
        <span onClick={openChat}>{'>'}</span>
      </div>
      <ChatBody messages={messages} />
      <ChatFooter socket={socket} messages={messages} />
    </div>
  </>
  )
}


export default Chat