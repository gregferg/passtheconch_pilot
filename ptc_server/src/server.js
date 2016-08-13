
import ioServer from 'socket.io';

import {createUniqueRandomStringID} from './actions/session';
import processRequest from './requestProcessor';

var app = require('express')();
var server = require('http').Server(app);
var io = ioServer(server);

server.listen(8090);

app.get('/', function (req, res) {
  res.sendFile('/Users/grantsauer/Desktop/ptc_pilot/test_client/index.html');
});

app.get('/bundle', function (req, res) {
  res.sendFile('/Users/grantsauer/Desktop/ptc_pilot/test_client/bundle.js');
});



var clientSockets = {};
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
      console.log(action);
      console.log('shit happened');
      action.socket = socket;
      processRequest(store, action);
      console.log(store.state);
    });

    socket.on('disconnect', function (){

      //TODO: Make it so that if the user is in the story the story gets deleted and the other user gets a notification
      console.log(clientSockets[socket]);
      const deleteUserSession = {
        type: 'REMOVE_SESSION',
        id: clientSockets[socket]
      }
      store.updateStore(deleteUserSession)

      delete clientSockets[socket]
      console.log(clientSockets);
      console.log("user left");
    });
  });


}
