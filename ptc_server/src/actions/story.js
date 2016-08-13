

function incrementStoryCounter(state) {
  return Object.assign({}, state, {storyCounter: state.storyCounter + 1});
}

export function createStory(state, action) {

  const updatedState = Object.assign({}, state);

  const storyCounter = state.storyCounter + 1;

  const userOne = action.users[0];
  const userTwo = action.users[1];

  console.log(updatedState);
  updatedState.stories[storyCounter] = { users: [userOne, userTwo], story: [] }

  updatedState.users[userOne] = {currentStory: {id: storyCounter, turn: false}}
  updatedState.users[userTwo] = {currentStory: {id: storyCounter, turn: true}}

  updatedState.storyCounter = storyCounter

  return updatedState;
}

export function updateStory(state, action) {
  const storyId = action.storyId;
  const sentence = action.sentence.trim();
  const newState = Object.assign({}, state);

  newState.stories[storyId].story.push(sentence);

  const userOne = newState.stories[storyId].users[0];
  const userTwo = newState.stories[storyId].users[1];

  const userOneTurn = newState.users[userOne].currentStory.turn;
  newState.users[userOne].currentStory.turn = !userOneTurn;
  newState.users[userTwo].currentStory.turn = userOneTurn;

  return newState;
}


export function removeStory(state, action) {
  const newState = Object.assign({}, state);

  const storyId = action.storyId;
  const userOne = newState.stories[storyId].users[0];
  const userTwo = newState.stories[storyId].users[1];

  delete newState.stories[storyId];
  delete newState.users[userOne].currentStory;
  delete newState.users[userTwo].currentStory;

  return newState;
}
