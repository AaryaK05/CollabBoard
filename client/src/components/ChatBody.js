import React from 'react'

export default function ChatBody({ messages }) {

  return (
    <div className='messagebody'>

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
