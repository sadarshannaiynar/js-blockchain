const app = require('express')();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const PORT = 5000;

app.get('/', (_, res) => {
  res.end('Hello World!!');
  io.emit('Request Hit');
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('disconnect', () => console.log(`User disconnected: ${socket.id}`));
});

httpServer.listen(PORT, () => console.log(`Listening on ${PORT}...`));
