import io from 'socket.io-client';
import {storyCreated, storyUpdated, storyFinished } from './actions/story';
import {setErrors} from './actions/errors'
import {setSession} from './actions/session'


export const socket = io();

export function addListeners(socket, store) {
  socket.on('SET_USER', (action) => {
    store.dispatch(setSession(action));
  })

  socket.on('NUM_USERS_ONLINE', (action) => {
    store.dispatch(action);
  })

  socket.on('STORY_CREATED', (action) => {
    store.dispatch(storyCreated(action));
  })

  socket.on('STORY_UPDATED', (action) => {
    store.dispatch(storyUpdated(action));
  })

  socket.on('FINISHED_STORY', (action) => {
    store.dispatch(storyFinished(action));
  })

  socket.on('OTHER_USER_LEFT', (action) => {
    action.type = 'OTHER_USER_LEFT'
    store.dispatch(action);
  })

  socket.on('ERROR', (action) => {
    store.dispatch(setErrors(action));
  })
}
