import NavBar from './navbar';
import React from 'react';

import generateClassName from './generateClassName';


/*
The normal socket.on(disconnect) was not working on the server side, it would
randomly go off even though the socket's had not disconnected. This is my
fix so that the socket will disconnect when the user closes or navigates away
from the window. It mainly works.
*/

import {SOCKET} from '../index.jsx';

window.onbeforeunload = function (e) {
  SOCKET.emit('disconnectMe', {currentUser: currentUser});

  for (var i = 0; i < 1000; i++) {
    console.log("user disconnecting");
  }
};


var currentUser;

export default React.createClass({
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
    user = newProps.user;
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
        <NavBar startNavigating={this.startNavigating}/>
        {childrenWithNavProps}
      </div>
    );
  }
});
