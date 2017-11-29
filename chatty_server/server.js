const express = require('express');
const ws = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new ws.Server({ server });
const clients = [];
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (socket) => {
  console.log('Client connected');
  clients.push(socket);
  socket.on('message', function incoming(message) {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage.username, 'said', parsedMessage.content);

    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(message);
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => console.log('Client disconnected'));
});