import React from 'react';
import BeginNewStory from './story/beginNewStory';

import {connect} from 'react-redux';
import Actions from '../actions/index';

require('../stylesheets/splash.css.scss')

export const Splash = React.createClass({

  render: function() {
    return (
      <div className="splash-container">
        <div className="splash">
          <div className="splash-title">
            <h1>Pass The Conch</h1>
            <p>Practice creativity, storytelling, and working with others through writing sentences back and forth to create a unique story.</p>
          </div>
          <div className="splash-buttons">
            <div className="splash-how-to-play">
              How to Play
            </div>
            <div className="splash-new-story">
              <BeginNewStory {...this.props} buttonTitle="Create a Story"/>
            </div>
        </div>
        </div>
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const SplashContainer = connect(
  mapStateToProps,
  Actions
)(Splash);

export default SplashContainer
