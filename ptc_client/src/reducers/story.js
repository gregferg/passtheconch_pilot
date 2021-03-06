export function searchingForStory(state, action) {
  const newState = Object.assign({}, state, {searching: true});
  return newState;
}

export function setNumOfOnlineUsers(state, action) {
  const newState = Object.assign({}, state, {numOfUsersOnline: action.numOfUsersOnline});
  return newState
}

export function storyCreated(state, action) {
  const changesToStory = {
    sentences: [],
    id: action.storyId,
    turn: action.turn,
    prompt: action.prompt,
    otherUserLeft: false,
    finished: false,
    timer: {timeLeft: 65, timerTimeout: null}
  }
  const createdStory = Object.assign({}, state.story, changesToStory)

  const newState = Object.assign({}, state, {story: createdStory}, {searching: false});
  return newState;
}


export function setUpdatedStory(state, action) {
  const changesToStory = {
    sentences: action.updatedStory,
    sentenceToAdd: "",
    turn: !state.story.turn,
    timer: {timeLeft: 60, timeout: null}
  }
  const updatedStory = Object.assign({}, state.story, changesToStory)

  const newState = Object.assign({}, state, {story: updatedStory});
  return newState;
}

export function updateSentence(state, action) {
  if (action.sentenceToAdd.length > 100) {
    const errors = { errors: ["Can't write more than 100 Characters!"] };
    const newState = Object.assign({}, state, errors);
    return newState;
  } else {
    const changesToStory = {
      sentenceToAdd: action.sentenceToAdd,
    }
    const updatedStory = Object.assign({}, state.story, changesToStory)

    const newState = Object.assign({}, state, {story: updatedStory});
    return newState;
  }
}

export function setFinishedStory(state, action) {
  clearTimeout(state.story.timer.timeout);

  const updatedStory = {
      id: null,
      sentences: action.finishedStory,
      sentenceToAdd: "",
      turn: false,
      finished: true,
      prompt: state.story.prompt,
      timer: {timeLeft: 60, timerTimeout: null}
  }

  const newState = Object.assign({}, state, {story: updatedStory});
  return newState;
}


export function reduceTimer(state, action) {
  const changesToTimer = {
    timeLeft: state.story.timer.timeLeft - 1,
  }
  const updatedTimer = Object.assign({}, state.story.timer, changesToTimer)
  const updatedStory = Object.assign({}, state.story, {timer: updatedTimer})

  const newState = Object.assign({}, state, {story: updatedStory});
  return newState;
}

export function setReduceTimerTimeout(state, action) {
  const changesToTimer = {
    timeout: action.timeout
  }
  const updatedTimer = Object.assign({}, state.story.timer, changesToTimer)
  const updatedStory = Object.assign({}, state.story, {timer: updatedTimer})

  const newState = Object.assign({}, state, {story: updatedStory});
  return newState;
}

export function userLeft(state, action) {
  clearTimeout(state.story.timer.timeout);

  var allSentences;
  if (state.story.sentences) {
    allSentences = Object.assign({}, { sentences: state.story.sentences }).sentences;
  } else {
    allSentences = [""];
  }

  const updatedStory = {
      id: null,
      sentences: allSentences,
      sentenceToAdd: "",
      otherUserLeft: true,
      turn: false,
      finished: true,
      prompt: state.story.prompt,
      timer: {timeLeft: 60, timerTimeout: null}
  }

  const newState = Object.assign({}, state, {story: updatedStory});
  return newState;

}
