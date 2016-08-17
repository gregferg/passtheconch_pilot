import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

require('../../stylesheets/search.css.scss');

var numOfPeriods = 0;
var animateTimeout;

export const Search = React.createClass({
  getInitialState: function() {
    return {searchingStatus: ""}
  },
  animateSeaching: function() {
    if (this.props.search === false) {
      clearTimeout(animateTimeout);
      hashHistory.push('/');
      return ;

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

    this.animateSeaching();
  },
  componentWillUnmount: function() {
    clearTimeout(animateTimeout);
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.story.id) {
      clearTimeout(animateTimeout);
      hashHistory.push('/story');
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
      <div className="search-container">
        <div className="search">
          <h1>Searching {this.state.searchingStatus}</h1>
        </div>
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    search: state.searching,
    story: state.story,
    errors: state.errors
  }
}

const SearchContainer = connect(
  mapStateToProps
)(Search);

export default SearchContainer
