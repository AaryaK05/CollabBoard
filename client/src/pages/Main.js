import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Chat from '../components/Chat'

import Board from '../components/Board'

export default function Main({socket}) {
  const [room,setRoom]=useState('');
  

  return (
    <div>
      <Header socket={socket}/>
      <div className='main-flex'>
        <Board socket={socket}/>
        <Chat socket={socket}/>
      </div>
    </div>
  )
}
