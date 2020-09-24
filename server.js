const express = require('express');

const server = express();

server.use(express.json());

//Setup routes
// server.use('/myroute', myComponent);

server.get('/', (req, res) => {
  res.status(200).send('Hello');
});

server.post('/api/users', (req, res) => {
  const user = req.body;

  if (user.id && user.name && user.bio) {
    usersArray.push(user);
    res.json({ message: 'User created succefully' });
  } else {
    res.json({ message: 'User missing required info, try again.' });
  }
});

const usersArray = [];

module.exports = server;
