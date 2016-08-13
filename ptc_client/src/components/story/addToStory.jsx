import React from 'react';
import Timer from './timer';
import Errors from '../errors';

export default React.createClass({
  handleChange: function(e) {
    e.preventDefault();

    if (e.target.value[e.target.value.length - 1] === "\n") {
      return ;
    } else {
      this.props.updateSetence(e.target.value)
    }
  },
  handleKeyPress: function(e) {
    const code = (e.keyCode ? e.keyCode : e.which);

    if (code === 13) {
      e.preventDefault();

      this.props.updateStoryRequest(this.props.story.id, this.props.story.sentenceToAdd, this.props.user)
    }
  },
  isDisabled: function() {
    // return !this.props.story.turn;
  },
  render: function() {
    const user = this.props.user;
    return (
      <div>
        <Errors {...this.props}/>
        <Timer {...this.props}/>
        <p>Sentences left: {10 - this.props.story.sentences.length}</p>
        <p>Characters {this.props.story.sentenceToAdd.length}/100</p>
        <textarea
          onKeyUp={this.handleKeyPress}
          onChange={this.handleChange}
          value={this.props.story.sentenceToAdd}>
        </textarea>

        <button
          onClick={() => this.props.updateStoryRequest(this.props.story.id, this.props.story.sentenceToAdd, user)}>
          Pass the Conch
        </button>
      </div>
    );
  }
});