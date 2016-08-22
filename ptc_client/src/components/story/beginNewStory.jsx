import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {createStoryRequest} from '../../actions/story.js';


require('../../stylesheets/beginNewStory.css.scss');

export const BeginNewStory = React.createClass({
  handleClick: function() {
    this.props.startNavigating();
    this.props.createStoryRequest(this.props.user)

    setTimeout(() => {
      hashHistory.push('/searching');
    },800)
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

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const BeginNewStoryContainer = connect(
  mapStateToProps,
  {createStoryRequest}
)(BeginNewStory);

export default BeginNewStoryContainer
