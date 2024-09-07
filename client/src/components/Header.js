import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

export default function Header({socket}) {

  const navigate=useNavigate();

  const handleLeave=()=>{
    localStorage.removeItem('Username');
    localStorage.removeItem('room');
    navigate('/');
    window.location.reload();
  }

  return (
    <div className='header'>
    <div>
        <SideBar socket={socket}/>
    </div>
        <button id='leave-btn' onClick={handleLeave}>LEAVE</button>
    </div>
  )
}
