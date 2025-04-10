import io from "socket.io-client"

const socket = io("http://localhost:8081", {
    query: { username: "Fox"}
});

socket.on('welcome', (data) => {
    console.log(data);
})

socket.on('broadcast', (data) => {
    console.log(`Broadcast: ${data}`);
})

socket.emit('message', "Hello everyone!");