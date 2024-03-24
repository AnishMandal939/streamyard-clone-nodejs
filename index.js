import http from 'http';
import express from 'express';
import path from 'path';
import { spawn } from 'child_process'; // because we will spawn a child process, spawn means to start a new process

import { Server as SocketIO } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server); // < Interesting! We are passing the server object to SocketIO
const youtubeAPIKey = 'dcfx-m7v2-j248-3185-9207';
// options to stream video live stream
const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/${youtubeAPIKey}`,
];

// cmd for ffmpeg process
const ffmpegProcess = spawn('ffmpeg', options);

app.use(express.static(path.resolve('./public')))

io.on('connection', socket => {
    console.log('New connection', socket.id);
    socket.on('binaryStream', (data) => {
        console.log('Binary stream received on server:', data);
        // io.emit('binaryStream', data);
        ffmpegProcess.stdin.write(stream, (err) => {
            if (err) {
                console.log('Error writing binary stream to ffmpeg process:', err);
            }
        });
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
