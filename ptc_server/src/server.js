
import Server from 'socket.io';

import {createUniqueRandomStringID} from './actions/session';
import processRequest from './requestProcessor';

export function startServer(store) {
  const io = new Server().attach(8090);

  io.on('connection', (socket) => {
    const uniqueRandomString = createUniqueRandomStringID(store.state);

    const newSessionAction = {
      type: 'newSession',
      id: uniqueRandomString
    }

    store.updateStore(newSessionAction)
    socket.emit({type: 'SET_USER', userID: uniqueRandomString})
  });


  io.on('action', (action) => {
    processRequest(store, action);
  });
}




socket.emit('state', store.getState().toJS());
socket.on('action', store.dispatch.bind(store));
