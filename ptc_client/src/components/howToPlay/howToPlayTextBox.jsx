import React from 'react';



var textToRender = "";
var idx = 0;
var timeout;

var finishedRenderingTextTimeout;

function generateRandomTime() {
  return Math.floor(Math.random() * 50 + 5);
}

export default React.createClass({
  getInitialState: function() {
    return { text: "" };
  },
  componentWillReceiveProps: function (newProps) {
    if (textToRender === newProps.textToRender) {
      return ;
    }

    textToRender = newProps.textToRender;
    idx = 0;

    timeout = setTimeout(() => {this.renderTyping()}, 2000);
  },
  componentWillUnmount: function () {
    clearTimeout(timeout);
    textToRender = "";
  },
  renderTyping: function() {
    if (!textToRender) {
      return;
    }

    if (idx === textToRender.length + 1 && textToRender) {
      clearTimeout(finishedRenderingTextTimeout);
      finishedRenderingTextTimeout = setTimeout(() => {this.props.finshedRenderingText()}, 2000)
    } else {

      this.setState({ text: textToRender.slice(0, idx)})

      if (textToRender[idx - 1] === "!" || textToRender[idx - 1] === ".") {
        timeout = setTimeout(() => {
          this.renderTyping()
        }, generateRandomTime() + 500);
      } else {
        timeout = setTimeout(() => {
          this.renderTyping()
        }, generateRandomTime());
      }

      idx++
    }
  },
  render: function() {
    return (
      <div className="how-to-play-textbox-container">
        <div className="how-to-play-textbox">
          <h3 className={this.props.className}>{this.state.text}</h3>
        </div>
      </div>
    );
  }
});
