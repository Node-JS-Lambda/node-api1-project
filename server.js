const express = require('express');

const server = express();

server.use(express.json());

//Setup routes
// server.use('/myroute', myComponent);

server.use('/', (req, res) => {
  res.status(200).send('Hello');
});

module.exports = server;
