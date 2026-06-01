import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {io} from 'socket.io-client';
import Home from './pages/Home';
import Main from './pages/Main';
import { useEffect, useState } from 'react';
import Loader from '../src/components/Loader'

const socket=io('https://whiteboard-collab-ucab.onrender.com');
const Url="https://whiteboard-collab-ucab.onrender.com";

function App() {
  const [isServerReady,setIsServerReady]=useState(false);
  const [isCheckingServer,setIsCheckingServer]=useState(true);

  function checkServerStatus(){
    fetch(Url).then((res)=>{
      if(res.ok){
        setIsServerReady(true);
      }
      else{
        console.log("Error",res.status);
        alert(res.status);
      }
    }).catch((err)=>{
      console.log("Server not ready!");
      alert(err);
    }).finally(()=>{
      setIsCheckingServer(false);
    })
  }

  useEffect(()=>{
    checkServerStatus();
  },[20])

  if(isCheckingServer || !isServerReady){
    return <Loader/>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home socket={socket}/>}/>
        <Route path='/chat' element={<Main socket={socket}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
