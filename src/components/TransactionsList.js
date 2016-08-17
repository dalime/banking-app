import React from 'react';
import ReactDOM from 'react-dom';
import { get, post, ajax } from 'jquery';
import CurrentList from './CurrentList';
import AddTransaction from './AddTransaction';
import Totals from './Totals';

const TransactionsList = React.createClass({
    getInitialState() {
      return {
        transactions: [],
        balance: 0,
        debitCount: 0,
        creditCount: 0,
        debitBalance: 0,
        creditBalance: 0
      }
  },
  componentDidMount() {
    get('/transactions')
    .done(transactions => {
      this.setState({transactions: transactions});
      let creditCount = 0;
      let debitCount = 0;
      let creditBalance = 0;
      let debitBalance = 0;
      let balance = 0;
      transactions.forEach(transaction => {
        if (transaction.type === 'Debit') {
          debitCount++;
          debitBalance += parseInt(transaction.value);
        } else {
          creditCount++;
          creditBalance += parseInt(transaction.value);
        }
      })
      balance = debitBalance - creditBalance;
      this.setState({balance: balance, debitCount: debitCount, creditCount: creditCount, debitBalance: debitBalance, creditBalance: creditBalance});
    })
    .fail(err => {
      console.log('ERROR: ', err);
    })
  },
  // componentDidUpdate() {
  //   this.setState({transactions: this.state.transactions, balance: this.state.balance, debitCount: this.state.debitCount, creditCount: this.state.creditCount, debitBalance: this.state.debitBalance, creditBalance: this.state.creditBalance});
  // },
  addTransaction(transaction) {
    console.log('TRANSACTION TO ADD: ', transaction);
    this.setState({transactions: this.state.transactions.concat(transaction)});

    ajax({
      type: 'POST',
      url: '/transactions',
      data: transaction
    })
    .done(transaction => {
      console.log(transaction);
    })
    .fail(err => {
      console.log(err);
    })
  },
  deleteTransaction(transactionId) {
    let deleteArr = this.state.transactions.filter(transaction => {
      return transaction._id != transactionId;
    });
    this.setState({transactions: deleteArr});

    console.log(`/transactions/${transactionId}`);

    ajax({
      type: 'DELETE',
      url: `/transactions/${transactionId}`,
    })
    .done(transaction => {
      console.log(transaction);
    })
    .fail(err => {
      console.log(err);
    })
  },
  updateTransaction(transactionId, newDescription, newValue, newType) {
    let updateTransactions = this.state.transactions;
    let updateTransaction = {
      description: newDescription,
      value: newValue,
      type: newType
    };
    for (let i = 0; i < updateTransactions.length; i++) {
      if (updateTransactions[i]._id === transactionId) {
        updateTransactions[i] = updateTransaction;
      }
    }
    this.setState({transactions: updateTransactions});

    ajax({
      type: 'PUT',
      url: `/transactions/${transactionId}`,
      data: updateTransaction
    })
    .done(transaction => {
      console.log(transaction);
    })
    .fail(err => {
      console.log(err);
    })
  },
  render() {
    if (this.state.transactions) {
      return (
        <div className="container">
          <h1>CH Bank</h1>
          <div>
            <Totals balance={this.state.balance} debitCount={this.state.debitCount} creditCount={this.state.creditCount} debitBalance={this.state.debitBalance} creditBalance={this.state.creditBalance}/>
          </div>
          <div>
            <AddTransaction add={this.addTransaction}/>
          </div>
          <hr/>
          <div>
            <CurrentList currTransactions={this.state.transactions} delete={this.deleteTransaction} update={this.updateTransaction} />
          </div>
          </div>
        )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
})

export default TransactionsList;
