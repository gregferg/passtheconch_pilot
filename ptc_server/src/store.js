
import reducer from './reducer';

export default function makeStore(reducer) {
  function store() {
    this.state = STORE_INTIAL_STATE;
    this.reducer = reducer;
  }
}

store.updateStore(action) {
  this.state = this.reducer(this.state, action);
}


export const STORE_INTIAL_STATE = {
  users: {},
  stories: {},
  storyCounter: 0
}
