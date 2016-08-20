import React from 'react';
import Timer from './timer';
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
  isTurn: function() {
    return this.props.story.turn ? {"display": "flex"} : {"display": "none"};
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
  render: function() {
    return (
      <div className={this.generateAddToStoryClassName("story-add-to", "animate-fade-and-slide4")}>
        <div className="errors">
          <Errors {...this.props}/>
        </div>

        <div className="story-add-to-timer-and-characters">
          <Timer {...this.props}/>

          <div className="story-senteneces-left">
            <p>Sentences left: {10 - this.props.story.sentences.length}</p>
          </div>

          <div className="story-characters">
            <p>Characters:</p>
            <p>{this.props.story.sentenceToAdd.length}/100</p>
          </div>
        </div>

        <textarea style={this.isTurn()} className="story-text-area"
          onKeyUp={this.handleKeyPress}
          onChange={this.handleChange}
          value={this.props.story.sentenceToAdd}>
        </textarea>

        <div style={this.isTurn()} className="story-update-button"
          onClick={() => this.props.updateStoryRequest(this.props.story.id, this.props.story.sentenceToAdd, this.props.user)}>
          Pass the Conch
        </div>
      </div>
    );
  }
});
