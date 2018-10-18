const SocketActions = require('./constants');

const Transaction = require('./models/transaction');
const Blockchain = require('./models/chain');

const socketListeners = (socket, chain) => {
  socket.on(SocketActions.TRIGGER_NODE, () => console.log('Node Triggered'));

  socket.on(SocketActions.ADD_TRANSACTION, (sender, receiver, amount) => {
    const transaction = new Transaction(sender, receiver, amount);
    chain.newTransaction(transaction);
    console.info(`Added transaction: ${JSON.stringify(transaction.getDetails(), null, '\t')}`);
  });

  socket.on(SocketActions.END_MINING, (chain) => {
    console.log('End Mining encountered');
    process.env.BREAK = true;
    console.log(process.env.BREAK === 'false');
    const blockChain = new Blockchain();
    blockChain.parseChain(chain);
    // if (blockChain.checkValidity() && blockChain.getLength() >= chain.getLength()) {
    //   chain.blocks = blockChain.blocks;
    // }
  });

  return socket;
};

module.exports = socketListeners;
