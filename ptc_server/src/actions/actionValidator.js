
function validateUserExists(state, user) {
  return state.users[user] !== undefined;
}

function validateStoryExists(state, user) {
  return state.users[user].currentStory !== undefined;
}

function validateStoryMatchs(state, user, storyId) {
  return state.users[user].currentStory['id'] === storyId;
}

function validateUsersTurn(state, user) {
  return state.users[user].currentStory['turn'];
}

export function validate(state, action) {
  switch (action.type) {
    case "newSession":
      return true;
    case "newStory":
      var user = action.user;
      return validateUserExists(state, user) &&
        !validateStoryExists(state, user);
    case "updateStory":
      var user = action.user;
      var storyId = action.storyId;

      return validateUserExists(state, user) &&
        validateStoryExists(state, user) &&
        validateStoryMatchs(state, user, storyId) &&
        validateUsersTurn(state, user);
    default:
      return false;
  }
}
