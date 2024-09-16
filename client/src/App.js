import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {io} from 'socket.io-client';
import Home from './pages/Home';
import Main from './pages/Main';

const socket=io('https://whiteboard-collab-server.vercel.app');

function App() {
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
