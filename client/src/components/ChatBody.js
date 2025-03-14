import React from "react";

export default function ChatBody({ messages }) {
  return (
    <div className="messagebody" id="data">
      {messages.map((m, index) => (
        <div className="chat-body" key={index}>
          <p className="sender-name">{m.name}:</p>
          <p className="chat-message">{m.message}</p>
        </div>
      ))}
    </div>
  );
}
