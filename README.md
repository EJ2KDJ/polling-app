# 🔌 Real-Time Polling Application with Socket.IO
A real-time bidirectional communication system built with JavaScript and Socket.IO for instant messaging between clients.

---

## Features
- Establish persistent Socket.IO connections between clients and server  
- Send and receive messages in real-time without HTTP polling  
- Broadcast messages to multiple connected clients simultaneously  
- Automatic reconnection handling and fallback transports  
- Event-based communication with custom event names  

---

## How It Works
1. Client connects to the server using Socket.IO client library  
2. The server:
   - Accepts the connection and establishes a socket  
   - Listens for custom events from the client  
3. When a client emits a message event:
   - The server receives it through the socket connection  
   - Processes the message data  
   - Uses `io.emit()` or `socket.broadcast.emit()` to send to other clients  
4. Clients listen for events and update the UI instantly when messages arrive  
5. Socket.IO handles disconnections and can attempt automatic reconnection  

---

## 📘 What I Learned
- How real-time communication works to APIs turn-based communication.
- Using event emitters for custom real-time events    
- Managing socket connections
