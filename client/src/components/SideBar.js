import React, { useEffect, useState } from "react";


export default function SideBar({socket}) {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers,setAllUsers]=useState([]);

  

  // useEffect(()=>{
    socket.on('getAllUsers',(data)=>{
      if(data.room == localStorage.getItem('room')){
        console.log(data.allUsers);
        setAllUsers(data.allUsers);
      }
    })
   
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
      <div className="sidebar hide" id="sidebar">
        <span class="closebtn" onClick={handleShowUsers}>
          &times;
        </span>
        <p>Users</p>
        {allUsers.map((a)=>{
          console.log(allUsers);
          return(
            <p>{a.name}</p>
          )
        })}
        <p>Room id:{localStorage.getItem('room')}</p>
     
      </div>
    </>
  );
}
