const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');

const { PORT } = process.env;

const nodes = [`http://localhost:${PORT}`];

app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.end('Hello World!!');
});

app.post('/addNode', (req, res) => {
  const { host, port } = req.body;
  const node = `http://${host}:${port}`;
  nodes.push(node);
  axios.post(`${node}/addNodeCallback`, {
    host: req.hostname,
    port: PORT,
  });
  console.info(`Added node ${node}`);
  res.json({ status: 'Added node' }).end();
});

app.post('/addNodeCallback', (req, res) => {
  const { host, port } = req.body;
  const node = `http://${host}:${port}`;
  nodes.push(node);
  console.info(`Added node ${node} back`);
  res.json({ status: 'Added node Back' }).end();
});

app.post('/triggerNode', (_, res) => {
  nodes.forEach((node) => axios.get(`${node}/triggered`));
  res.end();
});

app.get('/triggered', (_, res) => {
  console.log(`Triggered Node ${PORT}`);
  res.end('Triggered');
});

app.listen(PORT, () => console.info(`Express server running on ${PORT}...`));
