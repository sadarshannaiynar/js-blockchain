class Transaction {
  constructor(sender, receiver, amount) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  getDetails() {
    const { sender, receiver, amount, timestamp } = this;
    return {
      sender,
      receiver,
      amount,
      timestamp,
    };
  }

  parseTransaction(transaction) {
    this.sender = transaction.sender;
    this.receiver = transaction.receiver;
    this.amount = transaction.amount;
    this.timestamp = transaction.timestamp;
  }
}

module.exports = Transaction;
