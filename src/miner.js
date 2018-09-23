const socket = require('socket.io-client')('http://localhost:5000');

socket.on('Request Hit', () => console.log('Request Hit'));
