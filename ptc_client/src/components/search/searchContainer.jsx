import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

var numOfPeriods = 0;
var animateTimeout;

export const Search = React.createClass({
  getInitialState: function() {
    return {searchingStatus: ""}
  },
  animateSeaching: function() {
    numOfPeriods++
    animateTimeout = setTimeout(this.animateSeaching, 500)
    if (numOfPeriods === 4) {
      numOfPeriods = 0;
    }

    this.setState({ searchingStatus: (". ".repeat(numOfPeriods))});
  },
  componentDidMount: function() {
    this.animateSeaching();
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.story.id) {
      clearTimeout(animateTimeout);
      hashHistory.push('/story');
    }
  },
  render: function() {
    return <h1>Searching {this.state.searchingStatus}</h1>;
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
