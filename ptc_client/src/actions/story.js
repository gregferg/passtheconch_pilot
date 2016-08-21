export function createStoryRequest(user) {
  return {
    meta: { remote: true},
    type: "NEW_STORY_REQUEST",
    user: user
  }
}

export function updateStoryRequest(storyId, sentence, user) {
  return {
    meta: { remote: true},
    type: 'UPDATE_STORY_REQUEST',
    sentence,
    storyId,
    user
  }
}

export function storyCreated(action) {
  return {
    type: 'STORY_CREATED',
    storyId: action.storyId,
    turn: action.turn,
    prompt: action.prompt
  }
}

export function storyUpdated(action) {
  return {
    type: 'SET_UPDATED_STORY',
    updatedStory: action.updatedStory
  }
}

export function updateSentence(sentenceToAdd) {
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
