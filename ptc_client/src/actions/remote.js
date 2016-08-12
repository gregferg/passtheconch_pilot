

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
  console.log(action);
  return {
    type: 'STORY_CREATED',
    storyId: action.storyId,
    turn: action.turn,
  }
}

export function storyUpdated(action) {
  return {
    type: 'STORY_UPDATED',
    updateStory: action.updateStory
  }
}

export function storyFinished(action) {
  return {
    type: 'STORY_FINISHED',
    finishedStory: action.finishedStory
  }
}


export function setSession(action) {
  return {
    type: 'SET_SESSION',
    user: action.user
  }
}


export function displayErrors(action) {
  return {
    type: 'ERROR',
    errors: action.errors
  }
}
