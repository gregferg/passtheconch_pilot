import {createSession, removeSession} from './actions/session.js';
import {createStory, updateStory, removeStory} from './actions/story.js';


export default function reducer(state, action) {
  switch (action.type) {
    case 'newSession':
      return createSession(state, action);
    case 'removeSession':
      return removeSession(state, action);
    case 'NEW_STORY_REQUEST':
      return createStory(state, action);
    case 'UPDATE_STORY_REQUEST':
      return updateStory(state, action);
    case 'removeStory':
      return removeStory(state, action);
    default:
      return state;
  }
}
