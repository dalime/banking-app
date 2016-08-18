import React from 'react';

const AddTransaction = React.createClass({
  getInitialState() {
    return {
      description: "",
      value: "",
      type: ""
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
    this.setState({description: "", value: ""})
  },
  render() {
    return (
      <div>
        <h3>Add New Transaction</h3>
        <form>
          <label>For?:</label>
          <input type="text" onChange={e => this.onDescriptionInputChange(e)} required/>
          <label>Value:</label>
          <input type="number" onChange={e => this.onValueInputChange(e)} required/>
          <label>Debit</label>
          <input type="radio" name="debitCredit" value="Debit" onClick={this.onTypeInputChange}/>
          <label>Credit</label>
          <input type="radio" name="debitCredit" value="Credit" onClick={this.onTypeInputChange}/>
          <button className="btn btn-primary" onClick={this.addTransaction}>Add</button>
        </form>
      </div>

    )
  }
})

export default AddTransaction;
