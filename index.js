import http from 'http';
import express from 'express';
import path from 'path';

import { Server as SocketIO } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server); // < Interesting! We are passing the server object to SocketIO

app.use(express.static(path.resolve('./public')))

io.on('connection', socket => {
    console.log('New connection', socket.id);
    socket.on('binaryStream', (data) => {
        console.log('Binary stream received on server:', data);
        // io.emit('binaryStream', data);
    });

    // socket.on('message', (data) => {
    //     console.log('Message received on server:', data);
    //     io.emit('message', data);
    // });
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);
