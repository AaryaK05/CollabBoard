import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header({socket}) {

  const navigate=useNavigate();

  const handleLeave=()=>{
    localStorage.removeItem('Username');
    navigate('/');
    window.location.reload();
  }

  return (
    <div className='header'>
        <button id='leave-btn' onClick={handleLeave}>LEAVE</button>
    </div>
  )
}
