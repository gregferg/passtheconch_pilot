import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';
import {socket, addListeners} from './websocket';

import App from './components/app';
import SplashContainer from './components/splash';
import About from './components/about';
import SearchContainer from './components/search/searchContainer';
import StoryContainer from './components/story/storyContainer';
import NavBar from './components/navbar';


const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);
addListeners(socket, store);

const routes =
<Route path='/' component={App}>
  <IndexRoute component={SplashContainer} />
    <Route path="about" component={About} />
    <Route path="searching" component={SearchContainer} />
    <Route path="story" component={StoryContainer} />
  </Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
