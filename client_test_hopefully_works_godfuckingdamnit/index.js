import io from 'socket.io-client';
const socket = io.connect(`${location.protocol}//${location.hostname}:8090`);

var user;
socket.on('SET_USER', function(action) {
  console.log(action);

  user = action.user

  window.socket = socket;
})

socket.on('ERROR', function(action) {
  console.log(action.errors);
})

socket.on('newStory', function(action) {
  console.log(action);
})

socket.on('updateStory', function(action) {
  console.log(action);
})

socket.on('finishedStory', function(action) {
  console.log(action);
})
