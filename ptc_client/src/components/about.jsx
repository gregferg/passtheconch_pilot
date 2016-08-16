import React from 'react';

require('../stylesheets/about.css.scss')

export default React.createClass({
  render: function() {
    return (
      <div className="about-container">
        <div className="about">
          <div className="about-title">
            <h1>"Whoever holds the conch gets to speak."</h1>
            <div className="about-description">
              <p>Pass the Conch was created as a short turn based game to help people practice creative writing and joint storytelling. It is meant as a way to warm up before writting, to postpone boredom, other whatever other use you can find for it. None of the stories are saved, so if you like what you write, make sure to copy paste it to another application before starting another story otherwise the story will be gone forever!</p>
              <br />
              <p>If you have any suggestions on how to improve Pass the Conch, feel free to email pleasepasstheconch@gmail.com. Enjoy!</p>
            </div>
          </div>
        </div>
      </div>
  );
  }
});
