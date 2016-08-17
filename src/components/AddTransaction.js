import React from 'react';

const AddTransaction = React.createClass({
  getInitialState() {
    return {
      description: null,
      value: null,
      type: null
    }
  },
  onDescriptionInputChange(event) {
    this.setState({description: event.target.value});
  },
  onValueInputChange(event) {
    this.setState({value: event.target.value});
  },
  onTypeInputChange(event) {
    this.setState({type: event.target.value});
  },
  addTransaction(event) {
    event.preventDefault();
    let transaction = {
      description: this.state.description,
      value: this.state.value,
      type: this.state.type
    }
    this.props.add(transaction);
    this.setState({description: null, value: null, type: null})
  },
  render() {
    return (
      <div>
        <h2>Add New Transaction</h2>
        <form>
          <label>For?:</label>
          <input type="text" onChange={this.onDescriptionInputChange} required/>
          <label>Value:</label>
          <input type="number" onChange={this.onValueInputChange} required/>
          <label>Debit</label>
          <input type="radio" name="debitCredit" value="Debit" onClick={this.onTypeInputChange}/>
          <label>Credit</label>
          <input type="radio" name="debitCredit" value="Credit" onClick={this.onTypeInputChange}/>
        </form>
      </div>

    )
  }
})

export default AddTransaction;
