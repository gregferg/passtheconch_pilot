import {expect} from 'chai';


const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomStringID() {
    var randomString = '';
    for (var i = 0; i < 10; i++) {
    	var randomPoz = Math.floor(Math.random() * CHARSET.length);
    	randomString += CHARSET[randomPoz];
    }
    return randomString;
}

export function createSession(state) {
  var newSessionId = randomStringID();
  while (!(state.users[newSessionId] === undefined)) {
    newSessionId = randomStringID();
  }
  const users = Object.assign({}, state.users, {[newSessionId]: {}});

  return Object.assign({}, state, {users: users});
}

export function removeSession(state, user) {

  const users = Object.assign({}, state.users);
  delete users[user];

  return Object.assign({}, state, {users: users});
}
