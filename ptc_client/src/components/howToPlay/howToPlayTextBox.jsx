import React from 'react';



var textToRender = "";
var idx = 0;
var timeout;

function generateRandomTime() {
  return Math.floor(Math.random() * 50 + 5);
}

export default React.createClass({
  getInitialState: function() {
    return { text: "" };
  },
  componentWillReceiveProps: function (newProps) {
    console.log(newProps);
    textToRender = newProps.textToRender;
    idx = 0;

    timeout = setTimeout(() => {this.renderTyping()}, 2000);
  },
  componentWillUnmount: function () {
    clearTimeout(timeout);
  },
  renderTyping: function() {
    if (!textToRender) {
      return;
    }

    if (idx === textToRender.length + 1) {
      this.props.finshedRenderingText();
    } else {
      this.setState({ text: textToRender.slice(0, idx)})

      if (textToRender[idx] === "!" || textToRender[idx] === ".") {
        timeout = setTimeout(() => {this.renderTyping()}, generateRandomTime() + 500);
      } else {
        timeout = setTimeout(() => {this.renderTyping()}, generateRandomTime());
      }

      idx++
    }
  },
  render: function() {
    return (
      <div className="how-to-play-textbox-container">
        <div className="how-to-play-textbox-container">
          <p>{this.state.text}</p>
        </div>
      </div>
    );
  }
});
