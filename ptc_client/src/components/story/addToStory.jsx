import React from 'react';
import Timer from './timer';
import Errors from '../errors';

export default React.createClass({
  handleChange: function(e) {
    e.preventDefault();

    this.props.updateSetence(e.target.value)
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
        <p>Characters {this.props.story.sentenceToAdd.length}/100</p>
        <textarea
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
