import {createSession, removeSession} from './actions/session.js';
import {createStory, updateStory, removeStory} from './actions/story.js';


export default function reducer(state, action) {
  switch (action.type) {
    case 'newSession':
      return createSession(state, action);
    case 'removeSession':
      return removeSession(state, action);
    case 'newStory':
      return createStory(state, action);
    case 'updateStory':
      return updateStory(state, action);
    case 'removeStory':
      return removeStory(state, action);
    default:
      return state;
  }
}
