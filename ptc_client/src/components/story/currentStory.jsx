import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="story-current animate-fade-and-slide2">
        <p>{this.props.sentences.join(' ')}</p>
      </div>
    );
  }
});
