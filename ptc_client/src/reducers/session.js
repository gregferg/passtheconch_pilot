export function setSession(state, action) {
  const newState = Object.assign({}, state);

  newState.user = action.user;

  return newState;
}


export function setErrors(state, action) {
  const newState = Object.assign({}, state, {errors: action.errors});

  return newState;
}

export function clearErrors(state, action) {
  const newState = Object.assign({}, state, {errors: []});

  return newState;
}
