import React from 'react';

export default React.createClass({
  render: function() {
    const user = this.props.user;
    return (
      <div>
        <button onClick={() => this.props.createStoryRequest(user)}>Create Story</button>
      </div>
    );
  }
});
