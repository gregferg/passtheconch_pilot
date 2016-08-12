import React from 'react';



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
  render: function() {
    return (
      <div>
        <p>{this.props.errors.join('. ')}</p>
      </div>
    );
  }
});
