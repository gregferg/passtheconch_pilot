import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div>
        <p>{this.props.story.sentences.join('. ')}</p>
      </div>
    );
  }
});
