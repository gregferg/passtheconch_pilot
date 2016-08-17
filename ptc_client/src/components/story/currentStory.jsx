import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="story-current">
        <p>{this.props.story.sentences.join(' ')}</p>
      </div>
    );
  }
});
