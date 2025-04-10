import express from "express";
import http from 'http';
import { Server } from "socket.io";
import { Socket } from "socket.io-client";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const clients = new Map();

io.on('connection', (socket) =>{
    const username = socket.handshake.query.username;
    clients.set(socket.id, username);
    console.log(`${username} connected.`);
    socket.emit('Welcome',`Welcome ${username}`);

    socket.on('message', (message) => {
        console.log(`Message from ${username}: ${message}`);

        socket.broadcast.emit('broadcast', `${username} : ${message}`);
    })

    socket.on('disconnect', () => {
        console.log(`${username} disconneted.`);
        clients.delete(socket.id);
    });
});

server.listen(8081, () => {
    console.log(`server running on http://localhost:8081`);
})


