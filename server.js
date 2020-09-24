const express = require('express');

const server = express();

server.use(express.json());

//Setup routes
// server.use('/myroute', myComponent);

//Return all users
server.get('/api/users', (req, res) => {
  if (usersArray.length != 0) {
    res.json(usersArray);
  } else {
    res.status(404).json({ message: 'No users in database' });
  }
});

//Return specific user
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  usersArray.forEach((user) => {
    if (user.id == id) {
      return res.json(user);
    }
  });
  res.status(404).json({ message: `User with id: ${id} not found.` });
});

//Crerate new user
server.post('/api/users', (req, res) => {
  const user = req.body;

  if (user.id && user.name && user.bio) {
    usersArray.push(user);
    res.json({ message: 'User created succefully' });
  } else {
    res.status(404).json({ message: 'User missing required info, try again.' });
  }
});

const usersArray = [];

module.exports = server;
