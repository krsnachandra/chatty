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


// function broadcast(clients, newMessage) {
//   clients.forEach((client) => {
//       if (client.readyState == ws.OPEN) {
//         client.send(JSON.stringify(newMessage));
//       }
//     });
// }

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (socket) => {
  console.log('Client connected');
  clients.push(socket);

  const numberOfUsers = {
      id: uuidv1(),
      content: String(wss.clients.size),
      type: 'numberOfUsers'
    }

  clients.forEach((client) => {
    if (client.readyState == ws.OPEN) {
      client.send(JSON.stringify(numberOfUsers));
    }
  });

  //socket.send('');
  // broadcast(clients, {john:'MORE CLIENTS!', count: clients.length})

  socket.on('message', function incoming(message) {
    // console.log('MESSAGE RECIEVED:', message);
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
      id: uuidv1(),
      username: String(parsedMessage.username),
      content: String(parsedMessage.content),
      type: String(parsedMessage.type)
    }
    // console.log(newMessage);
    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });

  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => console.log('Client disconnected'));
});