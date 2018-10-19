JavaScript Blockchain
===

A simple implementation of blockchain using express and web sockets that allows you to add transaction and view the chain details.

## Frameworks Used


1. [Node.JS](https://nodejs.org/en/)

2. [Socket.io](https://socket.io/)

3. [Express](https://expressjs.com/)

4. [PM2 Runtime](https://pm2.io/runtime/)

## Start-Up

1. Run `yarn install` or `npm install`

2. Run `yarn start` or `npm start`

## Endpoints

### POST /nodes

Request Body:

```json
{
  "host": "localhost",
  "port": 5000
}
```

### POST /transaction

Request Body:

```json
{
  "sender": "Foo",
  "receiver": "Bar",
  "amount": 4
}
```

### GET /chain

Response: 

```json
[
  {
    "index": 0,
    "proof": 0,
    "timestamp": 1539970017557,
    "previousBlockHash": 1,
    "transactions": []
  },
  {
    "index": 1,
    "proof": 6109837942.514816,
    "timestamp": 1539970045394,
    "previousBlockHash": "4794a4da7764850e31a2974ea1983ee048e5d8db9d882c16e9d4b55c1ed4fd3e",
    "transactions": [
      {
        "sender": "A",
        "receiver": "B",
        "amount": 1,
        "timestamp": 1539970035916
      },
      {
        "sender": "C",
        "receiver": "D",
        "amount": 2,
        "timestamp": 1539970045393
      }
    ]
  },
```

LICENSE
===
[MIT](LICENSE.md)