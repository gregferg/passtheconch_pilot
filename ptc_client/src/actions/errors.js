export function setErrors(action) {
  return {
    type: 'ERROR',
    errors: action.errors
  }
}

export function clearErrorsTimeout() {
  return {
    type: 'CLEAR_ERRORS_TIMEOUT',
  }
}
