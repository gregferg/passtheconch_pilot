import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

require('../../stylesheets/search.css.scss');

var numOfPeriods = 0;
var animateTimeout;
var navigateTimout = false;

export const Search = React.createClass({
  getInitialState: function() {
    return {searchingStatus: ""}
  },
  animateSeaching: function() {
    if (navigateTimout) {
      return ;
    }

    if (this.props.search === false && this.props.story.id === null) {
      clearTimeout(animateTimeout);
      hashHistory.push('/');
      return ;

    } else if (this.props.story.id !== null) {

    } else {

      numOfPeriods++
      animateTimeout = setTimeout(this.animateSeaching, 500)
      if (numOfPeriods === 4) {
        numOfPeriods = 0;
      }

      this.setState({ searchingStatus: (". ".repeat(numOfPeriods))});
    }
  },
  componentDidMount: function() {
    if (this.checkIfPlayerIsActuallySearching()) {
      clearTimeout(animateTimeout);
      return;
    }

    if (this.props.story.id) {
      hashHistory.push('/story');
      return;
    }

    animateTimeout = setTimeout(() => {this.animateSeaching()}, 2000);
  },
  componentWillUnmount: function() {
    clearTimeout(animateTimeout);
  },
  componentWillReceiveProps: function(newProps) {
    if (!this.props.story.id && newProps.story.id) {
      navigateTimout = true;
      clearTimeout(animateTimeout);

      this.props.startNavigating();

      setTimeout(() => {
        hashHistory.push('/story')
      }, 800);
    }
  },
  checkIfPlayerIsActuallySearching: function() {
    // If you aren't searching, you shouldn't be on this page.
    if (this.props.search === false) {
      clearTimeout(animateTimeout);
      hashHistory.push('/');
      return true;
    }
  },
  render: function() {
    return (
      <div className="search-container animate-fade-and-slide1">
        <div className={this.props.generateClassName("search", this.props.isNavigating)}>
          <h1>Searching {this.state.searchingStatus}</h1>
          <p className="animate-fade-and-slide2">There are currently {this.props.numOfUsersOnline} users online.</p>
        </div>
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    numOfUsersOnline: state.numOfUsersOnline,
    search: state.searching,
    story: state.story,
    errors: state.errors
  }
}

const SearchContainer = connect(
  mapStateToProps
)(Search);

export default SearchContainer
