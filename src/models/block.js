const crypto = require('crypto');

const Transaction = require('./transaction');

class Block {
  constructor(index, previousBlockHash, previousProof, transactions) {
    this.index = index;
    this.proof = previousProof;
    this.previousBlockHash = previousBlockHash;
    this.transactions = transactions;
    this.timestamp = Date.now();
  }

  hashValue() {
    const { index, proof, transactions, timestamp } = this;
    const blockString= `${index}-${proof}-${JSON.stringify(transactions)}-${timestamp}`;
    const hashFunction = crypto.createHash('sha256');
    hashFunction.update(blockString);
    return hashFunction.digest('hex');
  }

  setProof(proof) {
    this.proof = proof;
  }

  getProof() {
    return this.proof;
  }

  getIndex() {
    return this.index;
  }

  getPreviousBlockHash() {
    return this.previousBlockHash;
  }

  getDetails() {
    const { index, proof, previousBlockHash, transactions, timestamp } = this;
    return {
      index,
      proof,
      timestamp,
      previousBlockHash,
      transactions: transactions.map(transaction => transaction.getDetails()),
    };
  }

  parseBlock(block) {
    this.index = block.index;
    this.proof = block.proof;
    this.previousBlockHash = block.previousBlockHash;
    this.timestamp = block.timestamp;
    this.transactions = block.transactions.map(transaction => {
      const parsedTransaction = new Transaction();
      parsedTransaction.parseTransaction(transaction);
      return parsedTransaction;
    });
  }

  printTransactions() {
    this.transactions.forEach(transaction => console.log(transaction));
  }
}

module.exports = Block;
