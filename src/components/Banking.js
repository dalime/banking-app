import React from 'react';

import TransactionsList from './TransactionsList.js';

const Banking = React.createClass({
  render() {
    return (
      <div>
        <TransactionsList />
      </div>
    )
  }
})

export default Banking;


// get(`/transactions/${this.state.id}`)
// .then(res => console.log('res:', res))

// post('/transactions', {
//   location: this.state.location
// })
// .then(res => console.log(res))
