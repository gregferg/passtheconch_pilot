import React from 'react';
import CurrentStory from '../story/currentStory';
import BeginNewStory from '../story/beginNewStory';
import AddToStory from '../story/addToStory';
import NotYourTurn from '../story/notYourTurn';


// "Welcome! First you'll have to find someone to play with..."
// "Ahh, looks like we've found someone!"
//
// "Your story begins with a country, a good longshoreman, and a heartfelt film shoot"
//
// "Every story begins with a randomly generated prompt, the one for this story is displayed right above!"
// "Right now it's our partner's turn, we're just waiting for him to start the first sentence"
//
// ["This was Gregory's first romantic comedy film shoot, but he already felt the magic start to happen."]
//
//
// "Ahh they responded, now it's your turn. You have 60 seconds to come up with the next sentence!
// When you're done typing press enter, or click 'Pass the Conch' to add your sentence to the story! Go ahead, give it a go!"
// "Nice, now we wait again for our partner to add their sentence to our story."
//
// ["Similar to how Harrison Ford was found, Gregory had been a longshoreman when he was found."]
//
// "Your turn again! Go ahead and type your response! You've probably noticed that the number of sentences
// left has gone down, each story currently has a maxium of 10 sentences"
// "Again we wait! Though probably not for long since our partner seems to be really fast at typing..."
//
// ["They were filming in the country, a scene that suited Gregory and his long golden locks."]
//
// 'Can you tell that you\'re playing our incredible "AI"? Yeah, we know, it\'s prettyyyyy sweet.
// Anyways, since you\'re just playing a bot, you can either finish this story, or click play
// to make a story with a random person on the internet!'
//
// ["Gregory, like I, has never loved before. He, like I, has always wondered what is love like?"]
//
// ["What, for instance, are the rules of love? Can robot........ love?"]



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
  "Ahh they responded, now it's your turn. You have 60 seconds to come up with the next sentence! When you're done typing press enter, or click 'Pass the Conch' to add your sentence to the story! Go ahead, give it a go!",
  "Nice, now we wait again for our partner to add their sentence to our story.",
  "Your turn again! Go ahead and type your response! You've probably noticed that the number of sentences left has gone down, each story currently has a maxium of 10 sentences",
  "Again we wait! Though probably not for long since our partner seems to be really fast at typing...",
  "Can you tell that you're playing our incredible AI? Yeah, we know, it's prettyyyyy sweet. Anyways since you're playing just playing a bot, you can either finish this story, or click play to make a story with a random person on the internet!",
];

var userInput = false;
var requestRecieved = false;

var timeout;

export const HowToPlay = React.createClass({
  getInitialState: function() {
    return {
      searching: true,
      idx: 0,
      story: {
        turn: false,
        sentences: [],
        sentenceToAdd: "",
        timer: {
          timeLeft: 60
        }
      }
    };
  },

  userInput: function() {
    userInput = true;
    this.nextStep();
  },
  componentWillUnmount: function() {
    clearTimeout(timeout);
    clearTimeout(this.state.story.timer.timeout);
  },
  componentWillMount: function() {
    var userInput = false;
    var requestRecieved = false;

    this.setState({
      searching: true,
      idx: 0,
      story: {
        turn: false,
        sentences: [],
        sentenceToAdd: "",
        timer: {
          timeLeft: 60
        }
      }
    });
  },
  nextStep: function() {
    switch (this.state.idx) {
      case 0:
        this.setState({ idx: 1});
        break;
      case 1:
        this.props.startNavigating();

        timeout = setTimeout(() => {
          this.setState({ searching: false, idx: 2 })
        }, 800);
        break;
      case 2:
        this.setState({ idx: 3});
        break;
      case 3:
        this.setState({ turnIsChanging: true });

        timeout = setTimeout(() => {
          var story = Object.assign({}, this.state.story);
          story.sentences = ["This was Gregory's first romanitic comedy film shoot, but already he felt the magic start to happen."];
          story.turn = true;
          story.timer.timeLeft = 60;
          this.setState({ story, idx: 4, turnIsChanging: false});
        }, 800)
        break;
      case 4:
        if (userInput) {
          this.setState({ idx: 5});
          userInput = false;
        }
        break;
      case 5:
        timeout = setTimeout(() => {
          this.setState({ turnIsChanging: true, idx: 6 });

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = true;
            story.timer.timeLeft = 60;
            story.sentences.push("Similar to how Harrison Ford was found, Gregory had been a longshoreman when he career changed.");

            this.setState({
              turnIsChanging: false,
              story
            });
          }, 2000);
        }, 3000);

        break;
      case 6:
        if (userInput) {
          userInput = false;
          this.setState({ turnIsChanging: true, idx: 7});

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = false;
            story.timer.timeLeft = 60;
            this.setState({
              turnIsChanging: false,
              story
            })
          }, 2000);
        }
        break;
      case 7:
        timeout = setTimeout(() => {
          this.setState({ turnIsChanging: true, idx: 8 });

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = true;
            story.timer.timeLeft = 60;
            story.sentences.push("They were filming in the country, a scence that suited Gregory and his long golden locks.");

            this.setState({
              turnIsChanging: false,
              story
            });
          }, 2000);
        }, 3000);
        break;
      case 8:
        if (userInput) {
          userInput = false;
          this.setState({ turnIsChanging: true, idx: 9});

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = false;
            story.timer.timeLeft = 60;
            this.setState({
              turnIsChanging: false,
              story
            })
          }, 2000);
        }
        break;
      case 9:
        timeout = setTimeout(() => {
          this.setState({ turnIsChanging: true, idx: 10 });

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = true;
            story.timer.timeLeft = 60;
            story.sentences.push("Gregoy, like I, has never loved before. He, like I, has always wondered what is love like?");

            this.setState({
              turnIsChanging: false,
              story
            });
          }, 2000);
        }, 3000);
        break;
      case 10:
        if (userInput) {
          userInput = false;
          this.setState({ turnIsChanging: true, idx: 11});

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = false;
            story.timer.timeLeft = 60;
            this.setState({
              turnIsChanging: false,
              story
            })
          }, 2000);
        }
        break;
      case 11:
        timeout = setTimeout(() => {
          this.setState({ turnIsChanging: true, idx: 12 });

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = true;
            story.timer.timeLeft = 60;
            story.sentences.push("What, for instance, are the rules of love? Can robot........ love?");

            this.setState({
              turnIsChanging: false,
              story
            });
          }, 2000);
        }, 3000);
        break;
      case 12:
        if (userInput) {
          userInput = false;
          this.setState({ turnIsChanging: true, idx: 13});

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = false;
            story.timer.timeLeft = 60;
            this.setState({
              turnIsChanging: false,
              story
            })
          }, 2000);
        }
        break;
      case 13:
        timeout = setTimeout(() => {
          this.setState({ turnIsChanging: true, idx: 14 });

          timeout = setTimeout(() => {
            var story = this.state.story;
            story.turn = true;
            story.timer.timeLeft = 60;
            story.sentences.push("What, for instance, are the rules of love? Can robot........ love?");

            this.setState({
              turnIsChanging: false,
              story
            });
          }, 2000);
        }, 3000);
        break;
      default:

    }
  },
  fakeUpdateSentence: function(sentence) {
    var story = Object.assign({}, this.state.story)
    story.sentenceToAdd = sentence
    this.setState({ story });
  },
  fakeStoryUpdateStoryRequest: function(id, setenceToAdd) {
    if (requestRecieved) {
      return ;
    }

    requestRecieved = true
    var story = Object.assign({}, this.state.story);
    story.sentences.push(setenceToAdd);
    story.sentenceToAdd = "";
    this.setState({ story, turnIsChanging: true });
    this.userInput()

    timeout = setTimeout(() => {
      story.turn = false;
      story.timer.timeLeft = 60;
      requestRecieved = false;
      this.setState({
        turnIsChanging: false,
        story
      });
    }, 800);
  },
  reduceTimer: function() {
    var story = Object.assign({}, this.state.story)
    story.timer.timeLeft = this.state.story.timer.timeLeft - 1
    this.setState({ story });
  },
  setReduceTimerTimeout: function(timeout) {
    var story = Object.assign({}, this.state.story)
    story.timer.timeout = timeout
    this.setState({ story });
  },
  renderSearchOrStory: function() {
    if (this.state.searching) {
      return (
        <div>
          <Search {...this.props}/>
          <HowToPlayTextBox className="how-to-play-search-render" finshedRenderingText={this.nextStep} textToRender={howToPlayText[this.state.idx]}/>
        </div>
      );
    } else {
      return (
        <div className="how-to-play-story-container">
          <h1 className="animate-fade-and-slide1">Story</h1>
          <p className="animate-fade-and-slide2">Your story begins with a country, a good longshoreman, and a heartfelt film shoot</p>

          <HowToPlayTextBox finshedRenderingText={this.nextStep} textToRender={howToPlayText[this.state.idx]}/>

          <CurrentStory sentences={this.state.story.sentences} />
          {this.state.story.turn?
          <AddToStory
            story={this.state.story}
            reduceTimer={this.reduceTimer}
            setReduceTimerTimeout={this.setReduceTimerTimeout}
            turnChange={this.state.turnIsChanging}
            updateSentence={this.fakeUpdateSentence}
            updateStoryRequest={this.fakeStoryUpdateStoryRequest}
            firstRender={this.state.firstRender}
            howToPlay={true}/>
          :
          <NotYourTurn
            story={this.state.story}
            reduceTimer={this.reduceTimer}
            setReduceTimerTimeout={this.setReduceTimerTimeout}
            turnChange={this.state.turnIsChanging}
            firstRender={this.state.firstRender}
            howToPlay={true}/>
        }


          {this.state.idx > 8 ? <BeginNewStory buttonTitle="Make a story!" className="story animate-fade-and-slide1"/> : <p></p>}
        </div>
      );
    }
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

export default HowToPlayContainer;
