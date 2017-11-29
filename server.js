const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 3001 });
// const clients = [];

// wss.on('connection', function connection(ws) {
//   cilents.push(ws);
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);

//     clients.forEach(client => {
//       if (client.readyState == ws.OPEN) {
//         client.send(message);
//       }
//     })
//   });

//   ws.send('welcome');
// });

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
