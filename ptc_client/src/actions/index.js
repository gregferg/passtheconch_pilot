import * as remoteActions from './session';
import * as storyActions from './story';
import * as errorActions from './errors';


const actions = Object.assign(remoteActions, storyActions);
export default actions;
