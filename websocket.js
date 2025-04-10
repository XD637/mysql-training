import { WebSocketServer } from "ws";
import url from "url"; 

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");


const clients = new Map();

wss.on("connection", (ws, req) => {
    const query = url.parse(req.url, true).query;
    const username = query.username || "Anonymous";
    clients.set(ws, username);
    console.log(`${username} Connected`);


    ws.send(`Welcome to the group chat ${username} !`);

    ws.on("message", (message) => {
        // if (message === "typing"){
        //     for (const client of clients){
        //         if(client !== ws && client.readyState === WebSocket.OPEN){
        //             client.send(`${username} is typing...`);
        //         };
        //     };
        // };
        console.log(`Message received from ${username}: ${message}`);

        for (const client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`${username} says: ${message}`);
            }
        }
    });

    ws.on("close", () => {
        console.log(`${username} Disconnected`);
        clients.delete(ws);
    });
});
