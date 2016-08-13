import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  handleClick: function() {
    hashHistory.push('/searching');
    this.props.createStoryRequest(this.props.user)
  },
  render: function() {
    return (
      <div>
        <button onClick={this.handleClick}>Create Story</button>
      </div>
    );
  }
});
