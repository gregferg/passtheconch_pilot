import makeStore from './src/store';
import {startServer} from './src/server';
import reducer from './src/reducer';

export const store = makeStore(reducer);
startServer(store);
