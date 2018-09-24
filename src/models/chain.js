const Block = require('./block');

const { isProofValid } = require('../utils/proof');

class Blockchain {
  constructor() {
    this.blocks = [new Block(0, 1, 0, [])];
    this.currentTransactions = [];
  }

  mineBlock(block) {
    this.blocks.push(block);
    this.currentTransactions = [];
  }

  newTransaction(transaction) {
    this.currentTransactions.push(transaction);
    if (this.currentTransactions.length === 2) {
      const previousBlock = this.lastBlock();
      const block = new Block(previousBlock.getIndex() + 1, previousBlock.hashValue(), previousBlock.getProof(), this.currentTransactions);
      this.mineBlock(block);
    }
  }

  lastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  getLength() {
    return this.blocks.length;
  }

  checkValidity() {
    const { blocks } = this;
    let previousBlock = blocks[0];
    for (let index = 1; index < blocks.length; index++) {
      const currentBlock = blocks[index];
      if (currentBlock.getPreviousBlockHash() !== previousBlock.hashValue()) {
        return false;
      }
      if (!isProofValid(previousBlock.getProof(), currentBlock.getProof())) {
        return false;
      }
      previousBlock = currentBlock;
    }
    return true;
  }

  printBlocks() {
    this.blocks.forEach(block => console.log(block));
  }
}

module.exports = Blockchain;
