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
}

module.exports = Transaction;
