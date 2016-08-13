import React from 'react';

var timeoutSet = false;
var timerTimeout;

export default React.createClass({
  decrementTimer: function() {

    if (!timeoutSet) {
      timeoutSet = true;
      this.props.reduceTimer();

      setTimeout(() => {
        timeoutSet = false;
      }, 1000);

      timerTimeout = setTimeout(() => {
        this.decrementTimer()
      }, 1000);

      this.props.setReduceTimerTimeout(timerTimeout);
    }
  },
  componentWillReceiveProps: function(newProps) {
    if (!newProps.story.turn) {
      return ;
    }

    if (newProps.story.timer.timeLeft < 0) {
      this.props.updateStoryRequest(
        this.props.story.id,
        this.props.story.sentenceToAdd,
        this.props.user
      )
    } else if (!timeoutSet) {
      this.decrementTimer();
    }
  },
  componentDidMount: function() {
    if (this.props.story.turn) {
      this.decrementTimer();
    }

  },
  render: function() {
    const user = this.props.user;
    return (
      <div>
        <p>Time Left: {this.props.story.timer.timeLeft}</p>
      </div>
    );
  }
});