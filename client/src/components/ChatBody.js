import React from 'react'

export default function ChatBody({ messages }) {

  // window.setInterval(function(){
  //   var elem=document.getElementById('data');
  //   elem.scrollTop = elem.scrollHeight;
  // },10000);
  console.log(messages);

  return (
    <div className='messagebody' id='data'>

      {messages.map((m) => {
        console.log(m);
        return (
          <div className='chat-body'>
            <p id='sender-name'>{m.name}:</p>
            <p>{m.message}</p>
          </div>
        )
      })}
    </div>
  )
}
