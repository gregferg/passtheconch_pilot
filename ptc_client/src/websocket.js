import io from 'socket.io-client';
import {setSession, storyCreated, storyUpdated, storyFinished, displayErrors}
from './actions/remote';

export const socket = io.connect(`${location.protocol}//${location.hostname}:8090`);

export function addListeners(socket, store) {
  socket.on('SET_USER', (action) => {
    store.dispatch(setSession(action));
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

  socket.on('ERROR', (action) => {
    store.dispatch(displayErrors(action));
  })

  socket.on('disconnect', () => {
    console.log("disconnected for no reason");
  })
}
