import NavBar from './navbar';
import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});
