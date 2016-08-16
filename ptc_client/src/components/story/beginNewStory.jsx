import React from 'react';
import {hashHistory} from 'react-router';

require('../../stylesheets/beginNewStory.css.scss');

export default React.createClass({
  handleClick: function() {
    hashHistory.push('/searching');
    this.props.createStoryRequest(this.props.user)
  },
  render: function() {
    return (
      <div className={this.props.className}>
        <div
          className="new-story-button"
          onClick={this.handleClick}>
          {this.props.buttonTitle}
        </div>
      </div>
    );
  }
});
