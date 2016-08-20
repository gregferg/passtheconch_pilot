import React from 'react';
import BeginNewStory from './story/beginNewStory';

import {connect} from 'react-redux';
import Actions from '../actions/index';
import {hashHistory} from 'react-router';


require('../stylesheets/splash.css.scss')

export const Splash = React.createClass({

  render: function() {
    return (
      <div className={this.props.generateClassName("splash-container", this.props.isNavigating)}>
        <div className="splash">
          <div className="splash-title">
            <h1 className="animate-fade-and-slide1">Pass The Conch</h1>
            <p className="animate-fade-and-slide2">Practice creativity, storytelling, and working with others through writing sentences back and forth to create a unique story.</p>
          </div>
          <div className="splash-buttons animate-fade-and-slide3">
            <div onClick={() => { hashHistory.push('howtoplay') }} className="splash-how-to-play">
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
