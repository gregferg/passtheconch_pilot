import React from 'react';

import {hashHistory} from 'react-router';

import {connect} from 'react-redux';
import Actions from '../actions/index';

require('../stylesheets/navbar.css.scss');

var timeoutSet = false;

export const NavBar = React.createClass({
  navigate: function(location) {
    if (timeoutSet || this.props.url === location) { return ; }
    this.props.startNavigating();

    timeoutSet = true;
    setTimeout(() => {
      hashHistory.push(location);
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
  render: function() {
    return (
      <div className="navbar-container animate-fade-and-slide-in-from-top">
        <div className="navbar">
          <div className="navbar-logo">
            <div className="navbar-link logo" onClick={() => {this.navigate('/')}}><p>Logo</p></div>
          </div>

          <div className="navbar-links">
            <div className="navbar-link" onClick={() => {this.navigate('/')}}><p>Home</p></div>
            <div className="navbar-link" onClick={this.navigatePlay}><p>Play</p></div>
            <div className="navbar-link" onClick={() => {this.navigate('/about')}}><p>About</p></div>
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
