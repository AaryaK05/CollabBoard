import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home({ socket }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    if(!name.trim()){
      alert('username is empty');
      return;
    }
    localStorage.setItem('Username', name);
    socket.emit('NewUserCreate', { name, SocketID: socket.id })
    navigate(`/chat/${name}`);
  }

  const handleJoin = (e) => {
    e.preventDefault();
    if(!name.trim()){
      alert('username is empty');
      return;
    }
    if(!room.trim()){
      alert('Enter room id');
      return;
    }
    localStorage.setItem('Username', name);
    socket.emit('NewUserJoin', { name, SocketID: socket.id, room: room })
    navigate(`/chat/${room}`);
  }

  return (
    <div className='home'>
      <div className='home-container'>
        <p id='login-text'>LOG IN</p>
        <p className='home-text'>Username:</p>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleCreate} className='home-btns'>Create</button>
        <p>OR</p>
        <p  className='home-text'>Room id:</p>
        <input
          type='text'
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={handleJoin} className='home-btns'>Join</button>
      </div>
    </div>
  )
}

export default Home