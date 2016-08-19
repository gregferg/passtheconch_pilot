
import ioServer from 'socket.io';

import {createUniqueRandomStringID} from './actions/session';
import processRequest from './requestProcessor';

var express = require('express');
var app = express();

var path = require('path');
var serveStatic = require('serve-static');

var port = process.env.PORT || 8090;

app.use(express.static('../../ptc_client/index.html'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../ptc_client/index.html'));
});

app.get('/bundle.js', function (req, res) {
  res.sendFile(path.join(__dirname, '../../ptc_client/bundle.js'));
});

app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../../ptc_client/style.css'));
});

var server = require('http').createServer(app).listen(port);

var io = ioServer(server, { pingTimeout: 4000, pingInterval: 4000 });

var clientSockets = {};
var clientSocketTimeouts = {};

export function startServer(store) {
  io.on('connection', (socket) => {
    console.log(socket + ' connected');
    var socketTimetout = null;

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
      action.socket = socket;
      processRequest(store, action);
      console.log(store.state);
    });

    socket.on('disconnectMe', function (userToDisconnect){
      //TODO: Make it so that if the user is in the story the story gets deleted and the other user gets a notification, also to remove the story that the user was working on.
      const deleteUserSession = {
        type: 'REMOVE_SESSION',
        user: userToDisconnect.user
      }

        console.log(userToDisconnect.user);
        console.log("user left");
        processRequest(store, deleteUserSession);
        delete clientSockets[userToDisconnect.user];
    });
  });
}
