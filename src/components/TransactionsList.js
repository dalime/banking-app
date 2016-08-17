import React from 'react';
import ReactDOM from 'react-dom';
import { get, post, ajax } from 'jquery';
import CurrentList from './CurrentList';
import AddTransaction from './AddTransaction';
import Totals from './Totals';

const TransactionsList = React.createClass({
    getInitialState() {
      return {
        transactions: []
      }

      //ajax({
    //   url: '/transactions/:id',
    //   type: 'DELETE',
    //   success: function(result) {
    //     //do something
    //   }
    // })


    // try {
    //   var transactions = JSON.parse(localStorage.transactions);
    // } catch(err) {
    //   var transactions = [];
    // }
    // return {transactions};
  },
  componentDidMount() {
    get('/transactions')
    .done(transaction => {
      console.log(transaction);
    })
    .fail(err => {
      console.log('ERROR: ', err);
    })
  },
  componentDidUpdate() {
    localStorage.transactions = JSON.stringify(this.state.transactions);
  },
  addTransaction(transaction) {
    this.setState({transactions: this.state.transactions.concat(transaction)});
  },
  deleteTransaction(transactionId) {
    let deleteArr = this.state.transactions.filter(transaction => {
      return transaction.id != transactionId;
    });
    this.setState({transactions: deleteArr});
  },
  updateTransaction(transactionId, newDescription, newValue, newType) {
    let updateTransactions = this.state.transactions;
    let updateTransaction = {
      description: newDescription,
      value: newValue,
      type: newType
    };
    for (let i = 0; i < updateTransactions.length; i++) {
      if (updateTransactions[i].id === transactionId) {
        updateTransactions[i] = updateTransaction;
      }
    }
    this.setState({transactions: updateTransactions});
  },
  render() {
    if (this.state.transactions) {
      return (
        <div className="container">
        {/* <div>
          <Totals transactions={this.state.transactions}/>
          </div> */}
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
        <h1>Fuck</h1>
      )
    }
  }
})

export default TransactionsList;
