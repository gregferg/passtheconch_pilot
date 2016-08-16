import React from 'react';
import BeginNewStory from './story/beginNewStory';

import {hashHistory} from 'react-router';

import {connect} from 'react-redux';
import Actions from '../actions/index';

require('../stylesheets/navbar.css.scss');

//

export const NavBar = React.createClass({
  navigateHome: function() {
    hashHistory.push('/');
  },
  navigatePlay: function() {
    hashHistory.push('/searching');
  },
  navigateAbout: function() {
    hashHistory.push('/about');
  },
  render: function() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <div className="navbar-logo">
            <div className="navbar-link logo">Logo</div>
          </div>
          <div className="navbar-links">
            <div className="navbar-link" onClick={this.navigateHome}>Home</div>
            <BeginNewStory className="navbar-link"  {...this.props} buttonTitle="Play"/>
            <div className="navbar-link"  onClick={this.navigateAbout}>About</div>
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
