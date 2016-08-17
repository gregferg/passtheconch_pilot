import React from 'react';

require('../stylesheets/errors.css.scss');

export default React.createClass({
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
