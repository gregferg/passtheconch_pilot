
import reducer from './reducer';

export default function makeStore(reducer) {

  const store = {
    state: STORE_INTIAL_STATE,
    reducer: reducer,
    updateStore: function(action) {
      this.state = this.reducer(this.state, action);
    }
  }

  return store;
}



export const STORE_INTIAL_STATE = {
  users: {numOnline: 0},
  stories: {},
  storyCounter: 0
}
