export function storyCreated(action) {
  return {
    type: 'STORY_CREATED',
    storyId: action.storyId,
    turn: action.turn,
  }
}

export function storyUpdated(action) {
  console.log('storyUpdatedaction');
  console.log(action);
  return {
    type: 'SET_UPDATED_STORY',
    updatedStory: action.updatedStory
  }
}

export function updateSetence(sentenceToAdd) {
  return {
    type: 'UPDATE_SETENCE',
    sentenceToAdd
  }
}

export function storyFinished(action) {
  return {
    type: 'SET_FINISHED_STORY',
    finishedStory: action.finishedStory
  }
}

export function reduceTimer() {
  return {
    type: 'REDUCE_TIMER'
  }
}

export function setReduceTimerTimeout(timeout) {
  return {
    type: 'SET_REDUCER_TIMER_TIMEOUT',
    timeout
  }
}

export function clearErrorsTimeout() {
  return {
    type: 'CLEAR_ERRORS_TIMEOUT',
  }
}
