
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

  users['numOnline'] += 1


  return Object.assign({}, state, {users: users});
}

export function removeSession(state, action) {
  const users = Object.assign({}, state.users);

  users['numOnline'] -= 1

  if (users[action.user].currentStory) {
    const stories = Object.assign({}, state.stories);

    const storyIdToRemove = users[action.user].currentStory.id;

    delete stories[storyIdToRemove]
    action.users.forEach((userToRemoveCurrentStory) => {
      delete users[userToRemoveCurrentStory].currentStory;
    })
    delete users[action.user];

    return Object.assign({}, state, {users: users, stories: stories});
  }

  delete users[action.user];
  return Object.assign({}, state, {users: users});
}
