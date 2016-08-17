import React from 'react';
import CurrentStory from './currentStory';
import BeginNewStory from './beginNewStory';
import AddToStory from './addToStory';

import {connect} from 'react-redux';
import Actions from '../../actions/index';

import {hashHistory} from 'react-router';


require('../../stylesheets/story.css.scss');

export const Story = React.createClass({
  componentWillMount: function() {
    if (!this.props.user) {
      hashHistory.push('/');
    }
  },
  render: function() {
    return (
      <div className="story-container">
        <div className="story">
          <h1>Story</h1>
          <h3>{this.props.story.prompt}</h3>
          <CurrentStory {...this.props} />
          {this.props.story.id ? <AddToStory {...this.props} /> : <p></p> }
          {this.props.story.id ? <p></p> : <BeginNewStory {...this.props} buttonTitle="Make another story" className="story"/>}
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user,
    story: state.story,
    errors: state.errors
  }
}

const StoryContainer = connect(
  mapStateToProps,
  Actions
)(Story);

export default StoryContainer
