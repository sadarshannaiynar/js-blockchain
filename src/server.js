const app = require('express')();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app);
const axios = require('axios');
const io = require('socket.io')(httpServer);
const client = require('socket.io-client');

const BlockChain = require('./models/chain');

const { PORT } = process.env;

const blockChain = new BlockChain();

app.use(bodyParser.json());

app.post('/nodes', (req, res) => {
  const { host, port } = req.body;
  const { callback } = req.query;
  const node = `http://${host}:${port}`;
  const socketNode = socketListeners(client(node));
  blockChain.addNode(socketNode);
  if (callback === 'true') {
    console.info(`Added node ${node} back`);
    res.json({ status: 'Added node Back' }).end();
  } else {
    axios.post(`${node}/nodes?callback=true`, {
      host: req.hostname,
      port: PORT,
    });
    console.info(`Added node ${node}`);
    res.json({ status: 'Added node' }).end();
  }
});

app.get('/triggerNode', (_, res) => {
  io.emit('triggerNode');
  res.json({ message: 'triggered nodes' }).end();
});

io.on('connection', (socket) => {
  console.info(`Socket connected, ID: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Socker disconnected, ID: ${socket.id}`);
  });
});

const socketListeners = (socket) => {
  socket.on('triggerNode', () => console.log('Node Triggered'));
  return socket;
};

blockChain.addNode(socketListeners(client(`http://localhost:${PORT}`)));

httpServer.listen(PORT, () => console.info(`Express server running on ${PORT}...`));
