import React from 'react';
import CurrentStory from './currentStory';
import BeginNewStory from './beginNewStory';
import AddToStory from './addToStory';
import NotYourTurn from './notYourTurn';

import {connect} from 'react-redux';
import Actions from '../../actions/index';

import {hashHistory} from 'react-router';


require('../../stylesheets/story.css.scss');

export const Story = React.createClass({
  getInitialState: function() {
    return ({ turnIsChanging: false });
  },
  componentWillMount: function() {
    if (!this.props.user) {
      hashHistory.push('/');
    }
  },
  componentWillReceiveProps: function (newProps) {
    if (newProps.story.turn && this.state.firstRender) {
      this.setState({ turn: true });
    } else {
      if (newProps.story.turn !== this.props.story.turn) {
        this.turnChange();
      }
    }
  },
  turnChange: function() {
    this.setState({ turnIsChanging: true, firstRender: false });

    setTimeout(() => { this.setState({ turnIsChanging: false, turn: this.props.story.turn })}, 800);
  },
  componentDidMount: function() {
    this.setState({ firstRender: true });
  },
  renderAddToStoryOrOtherTurn: function() {
    if (this.props.story.otherUserLeft || this.props.story.finished) {
      return;
    } else {
      if (this.state.turn) {
        return (
          <AddToStory
            {...this.props}
            turnChange={this.state.turnIsChanging}
            firstRender={this.state.firstRender}/>
        );
      } else {
        return (
          <NotYourTurn
            turnChange={this.state.turnIsChanging}
            firstRender={this.state.firstRender}/>
        );
      }
    }
  },
  render: function() {
    return (
      <div className="story-container">
        <div className={this.props.generateClassName("story", this.props.isNavigating)}>
          <h1 className="animate-fade-and-slide1">Story</h1>
          <h3 className="animate-fade-and-slide2">{this.props.story.prompt}</h3>

          <CurrentStory sentences={this.props.story.sentences} />

          {this.renderAddToStoryOrOtherTurn()}
          
          {this.props.story.otherUserLeft ? <p className="story-other-user-left animate-fade-and-slide1">Other User left..</p> : <p></p> }
          {this.props.story.id ? <p></p> : <BeginNewStory buttonTitle="Make another story?" className="story animate-fade-and-slide1"/>}
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
