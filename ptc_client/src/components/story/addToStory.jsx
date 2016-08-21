import React from 'react';
import TimerContainer from './timer';
import {Timer} from './timer';
import Errors from '../errors';


export default React.createClass({
  handleChange: function(e) {
    e.preventDefault();

    if (e.target.value[e.target.value.length - 1] === "\n") {
      return ;
    } else {
      this.props.updateSentence(e.target.value)
    }
  },
  handleKeyPress: function(e) {
    const code = (e.keyCode ? e.keyCode : e.which);

    if (code === 13) {
      e.preventDefault();

      this.props.updateStoryRequest(this.props.story.id, this.props.story.sentenceToAdd, this.props.user)
    }
  },
  generateAddToStoryClassName: function(normalClassName, firstAnimation) {
    if (this.props.firstRender) {
      return normalClassName + " " + firstAnimation;
    }

    if (this.props.turnChange && !this.props.firstRender) {
      return normalClassName + " navigate-away";
    } else {
      return normalClassName + " animate-fade-and-slide1";
    }
  },
  renderTimer: function() {
    if (this.props.howToPlay) {
      return (
        <Timer
          howToPlay={true}
          story={this.props.story}
          reduceTimer={this.props.reduceTimer}
          setReduceTimerTimeout={this.props.setReduceTimerTimeout}
          updateStoryRequest={this.props.updateStoryRequest}/>
      );
    } else {
      return <TimerContainer />
    }
  },
  render: function() {
    return (
      <div className={this.generateAddToStoryClassName("story-add-to", "animate-fade-and-slide4")}>
        <Errors />

        <div className="story-add-to-timer-and-characters">
          {this.renderTimer()}

          <div className="story-senteneces-left">
            <p>Sentences left: {10 - this.props.story.sentences.length}</p>
          </div>

          <div className="story-characters">
            <p>Characters:</p>
            <p>{this.props.story.sentenceToAdd.length}/100</p>
          </div>
        </div>

        <textarea className="story-text-area"
          onKeyUp={this.handleKeyPress}
          onChange={this.handleChange}
          value={this.props.story.sentenceToAdd}>
        </textarea>

        <div className="story-update-button"
          onClick={() => this.props.updateStoryRequest(this.props.story.id, this.props.story.sentenceToAdd, this.props.user)}>
          Pass the Conch
        </div>
      </div>
    );
  }
});
