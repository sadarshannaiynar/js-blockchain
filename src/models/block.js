const crypto = require('crypto');

const { generateProof } = require('../utils/proof');

class Block {
  constructor(index, previousBlockHash, previousProof) {
    this.index = index;
    this.proof = generateProof(previousProof);
    this.previousBlockHash = previousBlockHash;
    this.transactions = [];
    this.timestamp = Date.now();
  }

  hashValue() {
    const { index, proof, transactions, timestamp } = this;
    const blockString= `${index}-${proof}-${JSON.stringify(transactions)}-${timestamp}`;
    const hashFunction = crypto.createHash('sha256');
    hashFunction.update(blockString);
    return hashFunction.digest('hex');
  }

  getProof() {
    return this.proof;
  }

  transactionLength() {
    return this.transactions.length;
  }

  newTransaction(transaction) {
    this.transactions.push(transaction);
  }

  getDetails() {
    const { index, proof, previousBlockHash, transactions, timestamp } = this;
    return {
      index,
      proof,
      timestamp,
      previousBlockHash,
      transactions,
    };
  }
}

module.exports = Block;
