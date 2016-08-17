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
        <input id="editDescription" placeholder={this.props.transactionDescription} type="text" value={this.state.description} onChange={this.onDescriptionInputChange} required/>
        <input id="editValue" placeholder={this.props.transactionValue} type="number" value={this.state.value} onChange={this.onValueInputChange} required/>
        <input id="editType" placeholder={this.props.transactionType} type="text" value={this.state.type} onChange={this.onTypeInputChange} required/>
        <button onClick={this.confirmChange}>Confirm</button>
      </div>
    )
  }
})

export default EditForm;
