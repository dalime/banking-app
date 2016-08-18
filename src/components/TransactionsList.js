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
    this.updateBalances();
  },

  updateBalances() {
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

  addTransaction(transaction) {
    ajax({
      type: 'POST',
      url: '/transactions',
      data: transaction
    })
    .done(transaction => {
      this.setState({transactions: this.state.transactions.concat(transaction)});
      this.updateBalances();
    })
    .fail(err => {
      console.error(err);
    })
  },

  deleteTransaction(transactionId) {
    let deleteArr = this.state.transactions.filter(transaction => {
      return transaction._id != transactionId;
    });

    ajax({
      type: 'DELETE',
      url: `/transactions/${transactionId}`,
    })
    .done(transaction => {
      this.setState({transactions: deleteArr});
      this.updateBalances();
    })
    .fail(err => {
      console.error(err);
    })
  },

  updateTransaction(transactionId, newDescription, newValue, newType) {
    let updateTransaction = {
      description: newDescription,
      value: newValue,
      type: newType
    };
    let updateTransactions = this.state.transactions;
    for (let i = 0; i < updateTransactions.length; i++) {
      if (updateTransactions[i]._id === transactionId) {
        updateTransactions[i] = updateTransaction;
      }
    }

    ajax({
      type: 'PUT',
      url: `/transactions/${transactionId}`,
      data: updateTransaction
    })
    .done(transaction => {
      this.setState({transactions: updateTransactions});
      this.updateBalances();
    })
    .fail(err => {
      console.error(err);
    })
  },
  render() {
    if (this.state.transactions) {
      return (
        <div>
          <h1>Coding House Bank</h1>
          <Totals balance={this.state.balance} debitCount={this.state.debitCount} creditCount={this.state.creditCount} debitBalance={this.state.debitBalance} creditBalance={this.state.creditBalance}/>
          <AddTransaction add={this.addTransaction}/>
          <hr/>
          <CurrentList currTransactions={this.state.transactions} delete={this.deleteTransaction} update={this.updateTransaction} />
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
