const crypto = require('crypto');

const { generateProof } = require('../utils/proof');

class Block {
  constructor(index, previousBlockHash, previousProof, transactions) {
    this.index = index;
    this.proof = generateProof(previousProof);
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
      transactions,
    };
  }
}

module.exports = Block;
