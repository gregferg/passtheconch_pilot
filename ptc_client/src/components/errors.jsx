import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions/errors';

require('../stylesheets/errors.css.scss');

export const Errors = React.createClass({
  isDuckTypedComponent: function() {
    if (!this.props.errors) { return true; }
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.errors.length === 0) {
      return ;
    }

    if (newProps.errors === this.props.errors) {
      return ;
    } else {
      setTimeout(() => {
        this.props.clearErrorsTimeout()
      }, 5000);
    }
  },
  componentDidMount: function() {

    this.props.clearErrorsTimeout();
  },
  render: function() {

    return (
      <div className="errors">
        <p>{this.props.errors.join('. ')}</p>
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    errors: state.errors,
  }
}

const ErrorsContainer = connect(
  mapStateToProps,
  Actions
)(Errors);

export default ErrorsContainer
