
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
    // socket.emit('newStory', {type: 'SET_USER', user: uniqueRandomString})


    socket.on('action', (action) => {
      console.log(action);
      console.log('shit happened');
      action.socket = socket;
      processRequest(store, action);
      console.log(store.state);
    });
  });


}
