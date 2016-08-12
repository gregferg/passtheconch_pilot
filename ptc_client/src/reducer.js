import {setSession, setErrors, clearErrors} from './reducers/session.js';
import {searchingForStory, storyCreated, updateSetence, setUpdatedStory, setFinishedStory, reduceTimer, setReduceTimerTimeout} from './reducers/story.js';


const DEFAULT_STATE = {
  user: null,
  story: {
    id: null,
    sentences: [],
    sentenceToAdd: "",
    turn: null,
    finished: false,
    timer: {timeLeft: 5, timeout: null}
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
    case 'STORY_CREATED':
      return storyCreated(state, action);
    case 'UPDATE_SETENCE':
      return updateSetence(state, action);
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
    case 'CLEAR_ERRORS_TIMEOUT':
      return clearErrors(state, action);
    default:
      return state;
  }
}
