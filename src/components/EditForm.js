import React from 'react';

const EditForm = React.createClass({
  getInitialState: function() {
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
  confirmChange() {
    this.props.updateTransaction(this.props.transactionId, this.state.description, this.state.value, this.state.type);
    this.props.formVisible();
  },
  render() {

    return (
      <div hidden={this.props.hidden}>
        <label>Description: </label>
        <input id="editDescription" placeholder={this.props.transactionDescription} type="text" value={this.state.description} onChange={e => this.onDescriptionInputChange(e)} required/>
        <label>Value: </label>
        <input id="editValue" placeholder={this.props.transactionValue} type="number" value={this.state.value} onChange={e => this.onValueInputChange(e)} required/>
        <label>Debit: </label>
        <input id="editDebit" type="radio" value="Debit" onClick={e => this.onTypeInputChange(e)}/>
        <label>Credit: </label>
        <input id="editCredit" type="radio" value="Credit" onClick={e => this.onTypeInputChange(e)}/>
        <button className="btn btn-primary btn-sm" onClick={this.confirmChange}>
          <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
        </button>
      </div>
    )
  }
})

export default EditForm;
