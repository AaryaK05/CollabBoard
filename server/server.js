import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app=express();
const port=5000;
app.use(cors());

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000'
    }                                      
});

io.on('connection',(socket)=>{
    console.log('A user '+ socket.id +' connected');

    socket.on('NewUserCreate',(data)=>{
        console.log(data.name+' wants to create')
        const random=Math.floor(Math.random()*50);
        const room=data.name+'$'+random;
        socket.join(room);

    })

    socket.on('NewUserJoin',(data)=>{
        console.log(data.name+' wants to join room'+data.room)
        socket.join(data.room);
    })

    socket.on('NewMessage',(data)=>{
        const name=data.name;
        const message=data.msg;
        const AllMessages=data.messages;
        console.log(name+ '/'+ message+'/'+AllMessages);
        AllMessages.push({
            name:name,
            message:message
        });
        AllMessages.map(m=>{
            console.log(m);
        })
        io.emit('AllMessages',{AllMessages});
    })

    socket.on('disconnect',()=>{
        console.log('A user disconnected');
        socket.disconnect();
    })
})

app.get('/',(req,res)=>{
    res.send('Server Running');
})

// app.listen(port,()=>{
//     console.log(`Server started on port ${port}`);
// })

server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})