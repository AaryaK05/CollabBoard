import React, { useState } from "react";

export default function SideBar({ socket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // useEffect(()=>{
  socket.on("getAllUsers", (data) => {
    if (data.room === localStorage.getItem("room")) {
      setAllUsers(data.allUsers);
    }
  });

  // },[allUsers,socket]);

  const handleShowUsers = (e) => {
    const sideBar = document.getElementById("sidebar");
    if (isOpen) {
      setIsOpen(false);
      sideBar.style.width = "0px";
      sideBar.classList.add("hide");
    } else {
      setIsOpen(true);
      sideBar.style.width = "100px";
      sideBar.classList.remove("hide");
    }
  };
  return (
    <>
      <span id="show-users" onClick={handleShowUsers}>
        &#9776;
      </span>
      <div className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        <span className="close-btn" onClick={handleShowUsers}>
          &times;
        </span>
        <h2>Active Users</h2>
        <div className="user-list">
          {allUsers.map((a, index) => (
            <div key={index} className="user-item">
              <span className="user-icon">👤</span>
              {a.name}
            </div>
          ))}
        </div>
        <div className="room-id">
          <strong>Room ID:</strong> {localStorage.getItem("room")}
        </div>
      </div>
    </>
  );
}
