import React from 'react';

require('../stylesheets/errors.css.scss');

export default React.createClass({
  isDuckTypedComponent: function() {
    if (!this.props.errors) { return true; }
  },
  componentWillReceiveProps: function(newProps) {
    if (this.isDuckTypedComponent()) { return ; }

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
    if (this.isDuckTypedComponent()) { return ; }

    this.props.clearErrorsTimeout();
  },
  render: function() {
    if (this.isDuckTypedComponent()) { return <div></div>; }

    return (
      <div className="errors">
        <p>{this.props.errors.join('. ')}</p>
      </div>
    );
  }
});
