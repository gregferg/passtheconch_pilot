
import ioServer from 'socket.io';

import {createUniqueRandomStringID} from './actions/session';
import processRequest from './requestProcessor';

var express = require('express');
var app = express();

var path = require('path');
var serveStatic = require('serve-static');
// var easyrtc = require('./');


// process.title = "node-easyrtc";
var port = process.env.PORT || 8090;

app.use(express.static('../../ptc_client/index.html'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../ptc_client/index.html'));
});

app.get('/bundle.js', function (req, res) {
  res.sendFile(path.join(__dirname, '../../ptc_client/bundle.js'));
});

// server.listen(8090);
var server = require('http').createServer(app).listen(port);
var io = ioServer(server, { pingTimeout: 4000, pingInterval: 4000 });


var clientSockets = {};
var clientSocketTimeouts = {};
export function startServer(store) {
  // const io = new Server().attach(8090);

  io.on('connection', (socket) => {
    console.log(socket + ' connected');

    const uniqueRandomString = createUniqueRandomStringID(store.state);

    const newSessionAction = {
      type: 'newSession',
      id: uniqueRandomString
    }

    store.updateStore(newSessionAction)
    socket.emit('SET_USER', {type: 'SET_USER', user: uniqueRandomString})
    console.log(store.state.users);
    clientSockets[socket] = uniqueRandomString;



    socket.on('action', (action) => {
      clearTimeout(clientSocketTimeouts[clientSockets[socket]]);

      console.log(action);
      console.log('shit happened');
      action.socket = socket;
      processRequest(store, action);
      console.log(store.state);
    });

    socket.on('disconnect', function (){

      //TODO: Make it so that if the user is in the story the story gets deleted and the other user gets a notification, also to remove the story that the user was working on.
      console.log(clientSockets[socket]);
      const deleteUserSession = {
        type: 'REMOVE_SESSION',
        id: clientSockets[socket]
      }

      var timeout = setTimeout(() => {disconnectAfterTimeout(store, deleteUserSession)}, 120000);
      clientSocketTimeouts[clientSockets[socket]] = timeout;


      delete clientSockets[socket]
      console.log(clientSockets);
      console.log("user left");
    });
  });
}


function disconnectAfterTimeout(store, action) {
  store.updateStore(action)
}
