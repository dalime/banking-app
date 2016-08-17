import React from 'react';

const Transaction = React.createClass({
  getInitialState() {
    return {
      visible: "hidden"
    }
  },
  deleteTransaction() {
    let deleteId = this.props.transactionId;
    this.props.deleteTransaction(deleteId);
  },
  setFormHidden() {
    this.setState({visible: "hidden"});
  },
  updateButtonClick() {
    this.setState({visible: ""});
  },
  render() {
    return (
      <tr>
        <td>{this.props.transactionDescription}</td>
        <td>{this.props.transactionValue}</td>
        <td>{this.props.transactionType}</td>
        <td>
          <EditForm hidden={this.state.visible} formVisible={this.setFormHidden} updateTransaction={this.props.updateTransaction} transactionId={this.props.transactionId} transactionDescription={this.props.transactionDescription} transactionValue={this.props.transactionValue} transactionType={this.props.transactionType}/>
        </td>
        <td>
          <button className="btn btn-default" onClick={this.deleteTransaction}>Delete</button>
        </td>
        <td>
          <button className="btn btn-primary" onClick={this.updateButtonClick}>Update</button>
        </td>
      </tr>
    )
  }
})

const CurrentList = React.createClass({
  getInitialState() {
    return {
      transactions: this.props.currTransactions
    }
  },
  componentDidUpdate() {
    this.setState({transactions: this.props.currTransactions});
  },
  render() {
    let transactionList = this.state.transactions.map(transaction => {
      return <Transaction key={transaction.id} transactionId={transaction.id} transactionDescription={transaction.description} transactionValue={transaction.value} transactionType={transaction.type} deleteTransaction={this.props.delete} updateTransaction={this.props.update} />
    })
    return (
      <div>
        <h2>Transaction Details</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Value</th>
              <th>Type</th>
              <th></th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {transactionList}
          </tbody>
        </table>
      </div>
    )
  }
})

export default CurrentList;
