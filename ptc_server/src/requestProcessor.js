import createAPrompt from './prompts.js';
import validate from './actions/actionValidator';


export default function processRequest(store, action) {
  const request = validate(store.state, action);

  if (request.valid) {
    determineRequest(store, action);
  } else {
    returnErrorsToClient(action.socket, request);
  }
}

function returnErrorsToClient(clientSocket, request) {
  clientSocket.emit('ERROR', { type: 'ERROR', errors: request.errors })
}

const newStoryQueue = [];
const currentStoriesAndTheirSockets = {};

function determineRequest(store, action){
  switch (action.type) {
    case 'NEW_STORY_REQUEST':
      processNewStory(store, action);
      break;
    case 'UPDATE_STORY_REQUEST':
      processUpdateStory(store, action);
      break;
    case 'REMOVE_SESSION':
      processRemoveSession(store, action);
      break;
  }
}

function processNewStory(store, action) {
  const clientSocket = action.socket;

  clientSocket.emit('NUM_USERS_ONLINE', {type: 'NUM_USERS_ONLINE', numOfUsersOnline: store.state.users.numOnline});

  if (newStoryQueue.length >= 1) {
    if (newStoryQueue[newStoryQueue.length - 1].user === action.user) {
      return;
    }

    const otherClientSocketAndUser = newStoryQueue.pop();
    const otherUser = otherClientSocketAndUser.user;
    const OtherClientSocket = otherClientSocketAndUser.socket;
    const newStoryAction = { type: 'NEW_STORY_REQUEST', users: [otherUser, action.user] };

    store.updateStore(newStoryAction);
    const storyId = store.state.storyCounter;
    currentStoriesAndTheirSockets[storyId] = [clientSocket, OtherClientSocket];

    const prompt = createAPrompt();

    clientSocket.emit('STORY_CREATED', {
      storyId,
      turn: true,
      prompt
     });
    OtherClientSocket.emit('STORY_CREATED', { storyId, turn: false, prompt });
  } else {
    newStoryQueue.push({ user: action.user, socket: clientSocket });
  }
}


function processUpdateStory(store, action) {
  var storyId = action.storyId;
  store.updateStore(action);
  var updatedStory = store.state.stories[storyId].story;

  if (store.state.stories[storyId].story.length > 9) {
    currentStoriesAndTheirSockets[storyId].forEach(function(socket) {
      socket.emit('FINISHED_STORY', { finishedStory: updatedStory })
    });

    store.updateStore({type: 'removeStory', storyId: storyId});
    delete currentStoriesAndTheirSockets[storyId];
  } else {
    currentStoriesAndTheirSockets[storyId].forEach(function(socket) {
      socket.emit('STORY_UPDATED', { updatedStory: updatedStory })
    });
  }
}

function checkIfUserIsInNewStoryQueue(user) {
  for (var i = 0; i < newStoryQueue.length; i++) {
    if (newStoryQueue[i].user === user) {
      return i;
    }
  }

  return -1;
}

function processRemoveSession(store, action) {
  //action === { user: userID }
  //find other user's socket

  action.users = [action.user]

  var indexOfUserInQueue = checkIfUserIsInNewStoryQueue(action.user);
  if (indexOfUserInQueue !== -1) {
    newStoryQueue.splice(indexOfUserInQueue, 1);
  }

  if (store.state.users[action.user].currentStory) {
    const storyId = store.state.users[action.user].currentStory.id;

    action.users = (store.state.stories[storyId].users);

    currentStoriesAndTheirSockets[storyId].forEach(function(socket) {
      socket.emit('OTHER_USER_LEFT', { userWhoLeft: action.user })
    });
  }

  store.updateStore(action);
}
