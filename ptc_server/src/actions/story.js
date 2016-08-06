

function incrementStoryCounter(state) {
  return Object.assign({}, state, {storyCounter: state.storyCounter + 1});
}

export function createStory(state, users) {
  const storyCounter = state.storyCounter + 1;

  const userOne = users[0];
  const userTwo = users[1];

  const updatedStories = Object.assign({}, state.stories, {
    [storyCounter]: []
  });

  const updatedUsers = Object.assign({}, state.users, {
    [userOne]: {currentStory: {id: storyCounter, turn: false}},
    [userTwo]: {currentStory: {id: storyCounter, turn: true}}
  });

  var updatedState = Object.assign({}, state, {
      storyCounter: state.storyCounter + 1,
      stories: updatedStories,
      users: updatedUsers
    }
  );


  return updatedState;
}

export function updateStory(state, action) {
  const storyId = action.storyId;
  const sentence = action.sentence;

  const newState = Object.assign({}, state);

  newState.stories[storyId].push(sentence);

  return newState;
}

function validateTurn(state, userHashID) {
  const story = state.users[userHashID].currentStory;

  return story ? story.usersTurn: false;
}
