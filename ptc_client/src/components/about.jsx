import React from 'react';

require('../stylesheets/about.css.scss')

export default React.createClass({
  render: function() {
    return (
      <div className={this.props.generateClassName("about-container", this.props.isNavigating)}>
        <div className="about">
          <div className="about-title">
            <h1 className="about-title animate-fade-and-slide1">"Whoever holds the conch gets to speak."</h1>
            <div className="about-description animate-fade-and-slide2">
              <p>Pass the Conch was created as a short, turn-based game to help people practice creative writing and joint storytelling. It is meant as a way to warm up before writing, to postpone boredom, or however else you would like to use it. None of the stories are saved, so if you like what you write, make sure to copy & paste it to another application before starting your next story. Otherwise, it will be gone forever!</p>
              <br />
              <p>If you have any suggestions on how to improve Pass the Conch, feel free to email pleasepasstheconch@gmail.com. Enjoy!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
