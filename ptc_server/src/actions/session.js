
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomStringID() {
    var randomString = '';
    for (var i = 0; i < 10; i++) {
    	var randomPoz = Math.floor(Math.random() * CHARSET.length);
    	randomString += CHARSET[randomPoz];
    }
    return randomString;
}

export function createUniqueRandomStringID(state) {
  var newSessionId = randomStringID();
  while (state.users[newSessionId] !== undefined) {
    newSessionId = randomStringID();
  }
  return newSessionId;
}

export function createSession(state, action) {
  const users = Object.assign({}, state.users, {[action.id]: {}});

  return Object.assign({}, state, {users: users});
}

export function removeSession(state, action) {

  const users = Object.assign({}, state.users);
  delete users[action.id];

  return Object.assign({}, state, {users: users});
}
