const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); //polling library
const path = require('path');
const { timeStamp } = require('console');

const app = express(); // create express app

// create http server and socket server because socket.io needs a raw http server
const server = http.createServer(app); // create http server
const io = new Server(server); // create socket.io server

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Server static HTML file
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.username = "Anonymous"; // default username

    // Handle chat message event
    socket.on('chat message', (msg) => {
        // Sends message to all connected clients by 'emitting' an event
        io.emit('chat message', {
            username: socket.username,
            message: msg,
        }); 
    });

    // Handle username change
    socket.on('set username', (username) => {
        const oldUsername = socket.username;
        socket.username = username || "Anonymous";
        io.emit('user joined', {
            oldUsername: oldUsername,
            newUsername: socket.username
        });
    });

    //Just a message for when a user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});