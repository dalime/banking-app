const mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
  description: {type: String, required: true},
  value: {type: Number, required: true},
  type: {type: String, enum: ['Debit', 'Credit'], required: true},
  timestamp: {type: Date, required: true}
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
