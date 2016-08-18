import React from 'react';
import EditForm from './EditForm';

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
          <td>{this.props.transactionDate}</td>
          <td>
            <EditForm
              hidden={this.state.visible}
              formVisible={this.setFormHidden}
              updateTransaction={this.props.updateTransaction}
              transactionId={this.props.transactionId}
              transactionDescription={this.props.transactionDescription}
              transactionValue={this.props.transactionValue}
              transactionType={this.props.transactionType}
            />
          </td>
          <td>
            <button className="btn btn-danger btn-sm" onClick={this.deleteTransaction}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </td>
          <td>
            <button className="btn btn-success btn-sm" onClick={this.updateButtonClick}>
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </td>
        </tr>
    )
  }
})

const CurrentList = React.createClass({
  render() {
    let transactionList = this.props.currTransactions.map(transaction => {
      return (
        <Transaction
          key={transaction._id}
          transactionId={transaction._id}
          transactionDescription={transaction.description}
          transactionValue={transaction.value}
          transactionType={transaction.type}
          transactionDate={transaction.createdAt}
          deleteTransaction={this.props.delete}
          updateTransaction={this.props.update}
        />
      );
    });
    let display = transactionList.length ? transactionList : "";
    return (
      <div>
        <h3>Transaction Details</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Value</th>
              <th>Type</th>
              <th>Date Created</th>
              <th></th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {display}
          </tbody>
        </table>
      </div>
    );
  }
});

export default CurrentList;
