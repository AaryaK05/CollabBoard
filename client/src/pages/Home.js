import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home({ socket }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();


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
    localStorage.setItem('room', room);
    socket.emit('login', { SocketID: socket.id,name, room: room })
    navigate(`/chat`);
  }


  return (
    <div className="home">
      <div className="home-container">
        <h2 id="login-text">Log In</h2>
        <form className="home-form" onSubmit={handleJoin}>
          <div className="input-group">
            <label className="home-text">Username:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={4}
              required
            />
          </div>
          <div className="input-group">
            <label className="home-text">Room ID:</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room ID"
              maxLength="20"
              required
            />
          </div>
          <button type="submit" className="home-btns">Join</button>
        </form>
      </div>
    </div>
  );
}

export default Home