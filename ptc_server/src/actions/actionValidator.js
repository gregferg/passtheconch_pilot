
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

function validateSentenceLength(action) {
  return action.sentence.length < 100;
}

export default function validate(state, action) {
  const response = {
    valid: true,
    errors: []
  }

  switch (action.type) {
    case "newSession":
      return response;

    case "newStory":
      var user = action.user;
      if (!validateUserExists(state, user)) {
        response.valid = false;
        response.errors.push('User does not exist');

        return response;
      }
      if (validateStoryExists(state, user)) {
        response.valid = false;
        response.errors.push('User already is writing a story');
      }

      // TODO: validate socket somehow
      // if (action.clientSocket) {
      //   response.valid = false;
      //   response.errors.push('Need to be a valid socket');
      // }

      return response;


    case "UPDATE_STORY_REQUEST":
      var user = action.user;
      var storyId = action.storyId;

      if (!validateUserExists(state, user)) {
        response.valid = false;
        response.errors.push('User does not exist');

        return response;
      }
      if (!validateStoryExists(state, user)) {
        response.valid = false;
        response.errors.push('You don\'t have a story you\'re working on!');

        return response;
      }
      if (!validateStoryMatchs(state, user, storyId)) {
        response.valid = false;
        response.errors.push('That\'s not your story!');

        return response;
      }
      if (!validateUsersTurn(state, user)) {
        response.valid = false;
        response.errors.push('It\'s not your turn!');

        return response;
      }
      if (!validateSentenceLength(action)) {
        response.valid = false;
        response.errors.push('Your sentence is too long, keep it under 100 characters!');
      }

      return response;

    default:
      response.valid = false;
      response.errors.push('Not a valid request')
      return response;
  }
}
