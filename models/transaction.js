const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

let transactionSchema = new mongoose.Schema({
  description: {type: String, required: true},
  value: {type: Number, required: true},
  type: {type: String, enum: ['Debit', 'Credit'], required: true}
});
transactionSchema.plugin(timestamps);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
