import React from 'react'
import Header from '../components/Header'
import Chat from '../components/Chat'
import SideBar from '../components/SideBar'
import Board from '../components/Board'

export default function Main({socket}) {
  return (
    <div>
      <Header socket={socket} />
      <div className='main-flex'>
        <SideBar />
        <Board/>
        <Chat socket={socket}/>
      </div>
    </div>
  )
}
