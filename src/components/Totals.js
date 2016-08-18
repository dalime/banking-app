import React from 'react';

const Totals = React.createClass({
  render() {
    return (
      <div className="container">
        <h3>Totals</h3>
        <h5>Balance: ${this.props.balance}</h5>
        <h5>Debits: {this.props.debitCount} debit(s), ${this.props.debitBalance} balance</h5>
        <h5>Credits: {this.props.creditCount} credit(s), ${this.props.creditBalance} balance</h5>
      </div>
    )
  }
})

export default Totals;
