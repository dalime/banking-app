const mongoose = require('mongoose');

let transactionSchema = new mongoose.Schema({
  description: {type: String, required: true},
  value: {type: Number, required: true},
  type: {type: String, enum: ['Debit', 'Credit'], required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
