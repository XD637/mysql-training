import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

// Map to store usernames and associated WebSocket connections
const clients = new Map();

wss.on("connection", (ws, req) => {
    // Extract username from URL (e.g., ws://localhost:8080?username=Alice)
    const username = new URL(req.url, `http://${req.headers.host}`).searchParams.get("username");

    if (!username) {
        ws.send("Error: username is required to connect");
        ws.close();
        return;
    }

    console.log(`Client connected: ${username}`);
    clients.set(username, ws);

    // Notify all users that someone has joined
    broadcast(`${username} has joined the chat`, username);

    // Handle incoming messages
    ws.on("message", (data) => {
        try {
            const { type, content, recipient } = JSON.parse(data);

            if (type === "message") {
                // Broadcast the message to all (or send to a specific recipient)
                if (recipient) {
                    // Send to a specific recipient
                    const recipientSocket = clients.get(recipient);
                    if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
                        recipientSocket.send(JSON.stringify({ from: username, content }));
                    } else {
                        ws.send(JSON.stringify({ error: `User ${recipient} is not connected` }));
                    }
                } else {
                    // Broadcast to all
                    broadcast(`${username}: ${content}`, username);
                }
            } else if (type === "typing") {
                // Notify others that this user is typing
                broadcast(`${username} is typing...`, username, true);
            }
        } catch (error) {
            console.error("Invalid message format:", error);
            ws.send("Error: Invalid message format. Expected JSON.");
        }
    });

    // Handle client disconnections
    ws.on("close", () => {
        console.log(`Client disconnected: ${username}`);
        clients.delete(username);
        broadcast(`${username} has left the chat`, username);
    });
});

// Broadcast function: Sends a message to all connected clients except the sender
function broadcast(message, sender, isTyping = false) {
    for (const [username, client] of clients.entries()) {
        if (username !== sender && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: isTyping ? "typing" : "message", content: message }));
        }
    }
}
