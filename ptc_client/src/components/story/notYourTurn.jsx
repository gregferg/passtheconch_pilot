import React from 'react';
import Timer from './timer';


export default React.createClass({
  generateNotYourTurnClassName: function(normalClassName, firstAnimation) {
    if (this.props.firstRender) {
      return normalClassName + " " + firstAnimation;
    }

    if (this.props.turnChange) {
      return normalClassName + " navigate-away";
    } else {
      return normalClassName + " animate-fade-and-slide1";
    }
  },
  render: function() {
    return (
      <div className={this.generateNotYourTurnClassName("story-not-your-turn", "animate-fade-and-slide4")}>
        <Timer {...this.props} />
      </div>
      );
  }
})
