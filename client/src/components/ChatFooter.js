import React, { useState } from "react";

export default function ChatFooter({ socket, messages }) {
  const [msg, setMsg] = useState("");

  const handleSendMsg = () => {
    // e.preventDefault();
    const username = localStorage.getItem("Username");

    socket.emit("Message", { name: username, msg: msg, messages });
    setMsg("");
    document.getElementById("message-text").focus();
  };

  return (
    <div className="messagebox">
      <input
        type="text"
        id="message-text"
        name="message-text"
        placeholder="Type a message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button id="send-btn" onClick={handleSendMsg}>
        ➤
      </button>
    </div>
  );
}
