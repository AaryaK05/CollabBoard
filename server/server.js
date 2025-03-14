import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { addUser, getUser, deleteUser, getUsers } from './users.js';


const app=express();
const port=5000;
app.use(cors());

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'https://whiteboard-collab-u87n.onrender.com '
    }                                      
});

io.on('connection',(socket)=>{
    console.log('A user '+ socket.id +' connected');

    socket.on('login',({SocketID,name,room},callback)=>{
        const user=addUser(SocketID,name,room);
        socket.broadcast.emit('newUser',{name:name});
        const allUsers=getUsers(room);
        io.emit('getAllUsers',{room,allUsers})
    })
    
   
    socket.on('Message',(data)=>{
        const name=data.name;
        const message=data.msg;
        const AllMessages=data.messages;

        const user=getUser(socket.id);
        const room=user.room;
        
        AllMessages.push({
            name:name,
            message:message
        });
        
        io.emit('AllMessages',{room,AllMessages});
    })

    socket.on('image-data',(data)=>{
        const user=getUser(socket.id);
        const room=user.room;
        io.except(user).emit('image-data',{room,data});
    })

    socket.on('clearCanvas',()=>{
        const user=getUser(socket.id);
        const room=user.room;
        io.except(user).emit('clearCanvas');
    })

    socket.on('newMsgNotification',()=>{
        const user=getUser(socket.id);
        const room=user.room;
        io.except(user).emit('newMsgNotificationSet',{room});
    })

    
    socket.on('disconnect',()=>{
        console.log('A user disconnected');

        const temp=deleteUser(socket.id);
        if(temp){
            const room=temp.room;
            const allUsers=getUsers(room);
            io.emit('getAllUsers',{room,allUsers})
        }

        socket.disconnect();
    })
})

app.get('/',(req,res)=>{
    res.send('Server Running');
})

server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})

setInterval(() => {
    http.get('https://whiteboard-collab-ucab.onrender.com');
  }, 5 * 60 * 1000); // Ping every 5 minutes