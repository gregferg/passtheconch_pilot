export function setSession(action) {
  return {
    type: 'SET_SESSION',
    user: action.user
  }
}
