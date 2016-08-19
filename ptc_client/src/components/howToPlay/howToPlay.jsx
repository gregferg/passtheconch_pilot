import React from 'react';
import CurrentStory from '../story/currentStory';
import BeginNewStory from '../story/beginNewStory';
import AddToStory from '../story/addToStory';
import NotYourTurn from '../story/notYourTurn';


import {Search} from '../search/searchContainer';

import HowToPlayTextBox from './howToPlayTextBox';

import {connect} from 'react-redux';
import Actions from '../../actions/index';

import {hashHistory} from 'react-router';


require('../../stylesheets/howToPlay.css.scss');

var howToPlayText = [
  "Welcome! First you'll have to find someone to play with...",
  "Ahh looks like we've found someone!",
  "Every story begins with a randomly generated prompt, the one for this story is displayed right above!",
  "Right now it's our partner's turn, we're just waiting for him to start the first sentence",
  "Ahh they responsed, now it's your turn. You have 60 seconds to come up with the next sentence! When you're done typing press enter, or click 'Pass the Conch'",
  "Nice, now we wait again for our partner to add their sentence to our story.",
  "You've probably noticed that the number of sentences left has gone down, each story currently has a maxium of 10 sentences",
  "Can you tell that you're playing our incredible AI? Yeah, we know, it's pretty sweet. Anyways since you're playing just playing a bot, you can either finish this story, or click play to make a story with a random person on the internet!",
];

var userInput = false;

export const HowToPlay = React.createClass({
  getInitialState: function() {
    return { searching: true, idx: 0, story: { turn: false, sentences: []} };
  },
  componentWillMount: function() {

  },
  componentWillReceiveProps: function (newProps) {

  },
  turnChange: function() {

  },
  componentDidMount: function() {

  },
  userInput: function() {
    userInput = true;
    this.nextStep();


  },
  nextStep: function() {
    if (this.state.idx > 4 && userInput === false) {
      return;
    }

    setTimeout(() => {
      this.setState({ idx: this.state.idx + 1});
      userInput = false;

      if (this.state.idx === 2) {
        this.props.startNavigating();

        setTimeout(() => {this.setState({ searching: false })}, 800);
      }

      if (this.state.idx === 4) {
          setTimeout(() => {this.setState({ story: { turn: true, sentences: ["It was a dark and story night on the island, piggy wondered if this was the night he'd meet his demise"]}})}, 4000);
      }
    }, 3000)
  },
  incrementText: function() {
  },
  renderSearchOrStory: function() {
    if (this.state.searching) {
      return (
        <div>
          <Search {...this.props}/>
          <HowToPlayTextBox finshedRenderingText={this.nextStep} textToRender={howToPlayText[this.state.idx]}/>
        </div>
      );
    } else {
      {this.state.story.turn ? <AddToStory {...this.props} turnChange={this.state.turnIsChanging} firstRender={this.state.firstRender}/> : <NotYourTurn {...this.props} turnChange={this.state.turnIsChanging} firstRender={this.state.firstRender}/>}
      return (
        <div>
          <h1 className="animate-fade-and-slide1">Story</h1>
          <h3 className="animate-fade-and-slide2">Normal Prompt goes here!</h3>
          <HowToPlayTextBox finshedRenderingText={this.nextStep} textToRender={howToPlayText[this.state.idx]}/>
          <CurrentStory story={this.state.story} />

          {this.state.idx > 6 ? <BeginNewStory {...this.props} buttonTitle="Make another story?" className="story animate-fade-and-slide1"/> : <p></p>}
        </div>
      );
    }
  },
  finshedRenderingText: function() {

  },
  render: function() {
    return (
      <div className="how-to-play-container">
        <div className={this.props.generateClassName("how-to-play", this.props.isNavigating)}>
          {this.renderSearchOrStory()}
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    numOfUsersOnline: state.numOfUsersOnline,
    search: true,
    story: {id: false},
    errors: state.errors
  }
}

const HowToPlayContainer = connect(
  mapStateToProps,
  Actions
)(HowToPlay);

export default HowToPlayContainer
