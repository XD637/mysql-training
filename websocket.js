import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");


const clients = new Set();

wss.on("connection", (ws) => {
    
    clients.add(ws);
    console.log("A client connected");


    ws.send("Welcome to the group chat!");

    ws.on("message", (message) => {
        console.log(`Message received: ${message}`);

        for (const client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`Someone says: ${message}`);
            }
        }
    });

    ws.on("close", () => {
        console.log("A client disconnected");
        clients.delete(ws);
    });
});
