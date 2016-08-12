import * as remoteActions from './remote';
import * as storyActions from './story';


const actions = Object.assign(remoteActions, storyActions);
export default actions;
