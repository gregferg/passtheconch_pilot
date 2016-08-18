import React from 'react';
import BeginNewStory from './story/beginNewStory';

import {hashHistory} from 'react-router';

import {connect} from 'react-redux';
import Actions from '../actions/index';

require('../stylesheets/navbar.css.scss');

var timeoutSet = false;

export const NavBar = React.createClass({
  navigateHome: function() {
    if (timeoutSet || this.props.url === "/") { return ; }
    this.props.startNavigating();

    timeoutSet = true;
    setTimeout(() => {
      hashHistory.push('/');
      timeoutSet = false;
    }, 800);
  },
  navigatePlay: function() {
    if (timeoutSet || this.props.url === "/searching" || this.props.url === "/story") { return ; }
    this.props.startNavigating();

    timeoutSet = true;
    setTimeout(() => {
      this.props.createStoryRequest(this.props.user)
      hashHistory.push('/searching');
      timeoutSet = false;
    }, 800);
  },
  navigateAbout: function() {
    if (timeoutSet || this.props.url === "/about") { return ; }
    this.props.startNavigating();

    timeoutSet = true;
    setTimeout(() => {
      hashHistory.push('/about');
      timeoutSet = false;
    }, 800);
  },
  render: function() {
    return (
      <div className="navbar-container animate-fade-and-slide-in-from-top">
        <div className="navbar">
          <div className="navbar-logo">
            <div className="navbar-link logo" onClick={this.navigateHome}>Logo</div>
          </div>

          <div className="navbar-links">
            <div className="navbar-link" onClick={this.navigateHome}>Home</div>
            <div className="navbar-link" onClick={this.navigatePlay}>Play</div>
            <div className="navbar-link" onClick={this.navigateAbout}>About</div>
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

const NavBarContainer = connect(
  mapStateToProps,
  Actions
)(NavBar);

export default NavBarContainer
