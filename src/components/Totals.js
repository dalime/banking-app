import React from 'react';

const Totals = React.createClass({
  render() {
    return (
      <div>
        <h2>Totals</h2>
        <h5>Balance: ${this.props.balance}</h5>
        <h5>Debits: {this.props.debitCount} debits, ${this.props.debitBalance} balance</h5>
        <h5>Credits: {this.props.creditCount} credits, ${this.props.creditBalance} balance</h5>
      </div>
    )
  }
})

export default Totals;
