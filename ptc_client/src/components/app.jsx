import NavBar from './navbar';
import React from 'react';


import generateClassName from './generateClassName';


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
