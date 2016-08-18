import React from 'react';

var timeoutSet = false;
var timerTimeout;

export default React.createClass({
  decrementTimer: function() {
    if (!timeoutSet && this.props.story.timer.timeLeft > 0) {
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
    if (newProps.story.timer.timeLeft === 0 && this.props.story.turn) {
      this.props.updateStoryRequest(
        this.props.story.id,
        this.props.story.sentenceToAdd,
        this.props.user
      )
    } else if (!timeoutSet && newProps.story.timer.timeLeft > 0) {
      this.decrementTimer();
    }
  },
  componentDidMount: function() {
    setTimeout(() => {
      this.decrementTimer();
    }, 2000)
  },
  render: function() {

    const timeLeft = this.props.story.timer.timeLeft > 0 ? this.props.story.timer.timeLeft : 0;
    return (
      <div>
        <p>Time Left: {timeLeft}</p>
      </div>
    );
  }
});
