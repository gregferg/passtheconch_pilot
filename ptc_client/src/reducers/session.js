export function setSession(state, action) {
  const newState = Object.assign({}, state);

  newState.user = action.user;

  return newState;
}
