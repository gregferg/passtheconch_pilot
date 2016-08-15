import React from 'react';
import BeginNewStory from './story/beginNewStory';

import {hashHistory} from 'react-router';

import {connect} from 'react-redux';
import Actions from '../actions/index';

// <BeginNewStory {...this.props}/>

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
      <div>
        <p>Logo</p>
        <p onClick={this.navigateHome}>Home</p>
        <p onClick={this.navigatePlay}>Play</p>
        <p onClick={this.navigateAbout}>About</p>
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
