const express = require('express');
const ws = require('ws');
const uuidv1 = require('uuid/v1');

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
    let parsedMessage;
    // making the newMessage more secure
    try{
      parsedMessage = JSON.parse(message);
    } catch(error) {
      console.error(error);
      return;
    }
    if (parsedMessage == null || typeof parsedMessage !== 'object') {
      console.error('Message is not an object');
      return;
    }
    const newMessage = {
      username: String(parsedMessage.username),
      content: String(parsedMessage.content),
      id: uuidv1()
      // once things are getting saved to a db,
      // I'd like to program defensively and detect cases where the GUID already exists.
      // Recover, create a new GUID on the server side and try again
    }
    console.log(parsedMessage.username, 'said', parsedMessage.content);

    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => console.log('Client disconnected'));
});