var express = require('express');
var router = express.Router();

let Transaction = require('../models/transaction');

// GET ALL
router.get('/', (req, res) => {
  Transaction.find({}, (err, transactions) => {
    return res.status(err ? 400 : 200).send(err || transactions);
  })
})

// GET ONE
router.get('/:id', (req, res) => {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) return res.status(400).send(err || `Transaction not found`);
    return res.status(200).send(transaction);
  })
})

// CREATE
router.post('/', (req, res) => {
  console.log('hey');
  Transaction.create(req.body, (err, transaction) => {
    console.log(transaction);
    if (err) return res.status(400).send(`New transaction could not be created: ${err}`);
    return res.status(200).send(transaction);
  })
})

// DELETE
router.put('/:id', (req, res) => {
  Transaction.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400: 200).send(err || `Transaction ${req.params.id} was removed!`);
  })
})

// UPDATE
router.delete('/:id', (req, res) => {
  Transaction.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
    res.status(err ? 400: 200).send(err || req.body);
  })
})

module.exports = router;
