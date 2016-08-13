import React from 'react';
import BeginNewStory from './story/beginNewStory';

import {connect} from 'react-redux';
import Actions from '../actions/index';


export const Splash = React.createClass({

  render: function() {
    return <div className="voting">
      <h1>THIS IS SPLASH component</h1>
      <BeginNewStory {...this.props}/>
    </div>;
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
