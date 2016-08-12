
import {connect} from 'react-redux';
import React from 'react';

export const Search = React.createClass({
  render: function() {
    <h1>hi</h1>;
  }
});


function mapStateToProps(state) {
  return {
    search: state.searching,
    errors: state.errors
  }
}

const SearchContainer = connect(
  mapStateToProps
)(Search);

export default SearchContainer
