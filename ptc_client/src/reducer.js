import {setSession} from './reducers/session.js';
import {setErrors, clearErrors} from './reducers/errors.js';

import {
  searchingForStory,
  storyCreated,
  updateSentence,
  setUpdatedStory,
  setFinishedStory,
  userLeft,
  reduceTimer,
  setReduceTimerTimeout,
  setNumOfOnlineUsers
} from './reducers/story.js';


const DEFAULT_STATE = {
  user: null,
  story: {
    id: null,
    sentences: [],
    sentenceToAdd: "",
    prompt: "",
    turn: null,
    finished: false,
    timer: {timeLeft: 65, timeout: null}
  },
  errors: [],
  searching: false
}

export default function reducer(state = DEFAULT_STATE, action) {
  console.log(action);

  switch (action.type) {
    case 'SET_SESSION':
      return setSession(state, action);
    case 'NEW_STORY_REQUEST':
      return searchingForStory(state, action);
    case 'NUM_USERS_ONLINE':
      return setNumOfOnlineUsers(state, action);
    case 'STORY_CREATED':
      return storyCreated(state, action);
    case 'UPDATE_SETENCE':
      return updateSentence(state, action);
    case 'SET_UPDATED_STORY':
      return setUpdatedStory(state, action);
    case 'SET_FINISHED_STORY':
      return setFinishedStory(state, action);
    case 'REDUCE_TIMER':
      return reduceTimer(state, action);
    case 'SET_REDUCER_TIMER_TIMEOUT':
      return setReduceTimerTimeout(state, action);
    case 'ERROR':
      return setErrors(state, action);
    case 'OTHER_USER_LEFT':
      return userLeft(state, action);
    case 'CLEAR_ERRORS_TIMEOUT':
      return clearErrors(state, action);
    default:
      return state;
  }
}
