import NavBar from './navbar';
import React from 'react';
import {connect} from 'react-redux';

import generateClassName from './generateClassName';


/*
The normal socket.on(disconnect) was not working on the server side, it would
randomly go off even though the socket's had not disconnected. This is my
fix so that the socket will disconnect when the user closes or navigates away
from the window. 60% of the time, it works everytime. Jokes aside, the only bug
is if someone spams refreshing the page, this code sometimes won't run, but the
socket will connect, so there will be a phantom user left in the backend state.
*/

import {SOCKET} from '../index.jsx';

window.onbeforeunload = function (e) {
  SOCKET.emit('disconnectMe', {user: currentUser});

  for (var i = 0; i < 1000; i++) {
    console.log("user disconnecting");
  }
};

var currentUser;


export const App = React.createClass({
  getInitialState: function() {
    return { isNavigating: false };
  },
  startNavigating: function() {
    this.setState({ isNavigating: true });

    setTimeout(this.stopNavigating, 1000);
  },
  stopNavigating: function() {
    this.setState({ isNavigating: false });
  },
  componentWillReceiveProps(newProps) {
    currentUser = newProps.user;
  },
  render: function() {
    const childrenWithNavProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        isNavigating: this.state.isNavigating,
        startNavigating: this.startNavigating,
        generateClassName
      })
    );

    return (
      <div>
        <NavBar startNavigating={this.startNavigating} url={this.props.location.pathname}/>
        {childrenWithNavProps}
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    user: state.user
  }
}


const AppContainer = connect(mapStateToProps)(App);

export default AppContainer
