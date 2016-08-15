import React from 'react';
import BeginNewStory from './story/beginNewStory';

import {connect} from 'react-redux';
import Actions from '../actions/index';


export const Splash = React.createClass({

  render: function() {
    return <div>
      <h1>Pass The Conch</h1>
      <p>Practice creativity, storytelling, and working with others.</p>
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
