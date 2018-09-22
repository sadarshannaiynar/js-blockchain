const Block = require('./block');

const { isProofValid } = require('../utils/proof');

class Blockchain {
  constructor(initialBlock) {
    this.blocks = [initialBlock];
    this.currentTransactions = [];
  }

  mineBlock(block) {
    this.blocks.push(block);
  }

  newTransaction(transaction) {
    this.currentTransactions.push(transaction);
    if (this.currentTransactions.length > 1) {
      const previousBlock = this.lastBlock();
      const block = new Block(previousBlock.getIndex() + 1, previousBlock.hashValue(), previousBlock.getProof(), this.currentTransactions);
      this.mineBlock(block);
      console.log('Chain: ');
      console.log(this.blocks);
      this.currentTransactions = [];
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
    this.blocks.forEach((block) => {
      console.log(block);
    });
  }
}

module.exports = Blockchain;
