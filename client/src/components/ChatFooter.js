import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function ChatFooter({socket,messages}) {
    const [msg,setMsg]=useState('');

  

    const handleSendMsg=()=>{
      // e.preventDefault();
      const username=localStorage.getItem('Username');
      const room=localStorage.getItem('room');

      socket.emit('Message',
        {name:username,msg:msg,messages})
      setMsg('');
      document.getElementById('message-text').focus();
    }

  return (
    <div className='messagebox'>
        <input
            type='text'
            id='message-text'
            name='message-text'
            placeholder='send message...'
            value={msg}
            onChange={(e)=>setMsg(e.target.value)}
            
        />
        <button id='send-btn' onClick={handleSendMsg}>Send</button>
    </div>
  )
}