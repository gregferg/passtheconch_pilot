import React from 'react';
import CurrentStory from './currentStory';
import BeginNewStory from './beginNewStory';
import AddToStory from './addToStory';

import {connect} from 'react-redux';
import Actions from '../../actions/index';


export const Story = React.createClass({
  render: function() {
    console.log(this.props);
    const user = this.props.user;
    return (
      <div>
        <h1>StoryContainer</h1>
        <CurrentStory {...this.props} />
        {this.props.story.id ? <AddToStory {...this.props} /> : <p></p> }
        {this.props.story.id ? <p></p> : <BeginNewStory {...this.props} />}
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
