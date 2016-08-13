
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
  }
}

function processNewStory(store, action) {
  const clientSocket = action.socket;

  if (newStoryQueue.length === 1) {
    if (newStoryQueue[0].user === action.user) {
      return;
    }
    const otherClientSocketAndUser = newStoryQueue.pop();
    const otherUser = otherClientSocketAndUser.user;
    const OtherClientSocket = otherClientSocketAndUser.socket;
    const newStoryAction = { type: 'NEW_STORY_REQUEST', users: [otherUser, action.user] };

    store.updateStore(newStoryAction);
    const storyId = store.state.storyCounter;
    currentStoriesAndTheirSockets[storyId] = [clientSocket, OtherClientSocket];

    clientSocket.emit('STORY_CREATED', { storyId: storyId, turn: true });
    OtherClientSocket.emit('STORY_CREATED', { storyId: storyId, turn: false });
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
