const express = require('express');
const db = require('./DB/db');
const server = express();

server.use(express.json());

//Setup routes
// server.use('/myroute', myComponent);

//Return all users
server.get('/api/users', (req, res) => {
  const allUsers = db.getAllUsers();
  if (allUsers.length != 0) {
    res.json(allUsers);
  } else {
    res
      .status(500)
      .json({ message: 'The users information could not be retrieved.' });
  }
});

//use query
server.get('/api/users/test', (req, res) => {
  const query = req.query;
  console.log(`Query: ${query}`);
  res.json({ message: `Query: ${query.sortby}` });
});

//Return specific user
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const userExist = db.getUser(id);
  if (userExist) {
    return res.json(userExist.user);
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
});

//Crerate new user
server.post('/api/users', (req, res) => {
  const data = req.body;
  if (data.name && data.bio) {
    const newUser = db.createUser(data);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res
        .status(500)
        .json({ message: 'Server error, user could not be created.' });
    }
  } else {
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user.' });
  }
});

//Delete user
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const deleteSuccesful = db.deleteUser(id);
  //Check if user exist
  if (deleteSuccesful) {
    res.json({
      message: `User with id ${deleteSuccesful.user.id} has been deleted.`,
    });
  } else {
    //If does not exist show error
    res.status(404).json({
      message: 'The user with the specified ID does not exist.',
    });
  }
});

//Update current user data
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const userExist = db.updateUser(id, data);

  if (userExist) {
    if (data.name && data.bio) {
      res.status(200).json(userExist.user);
    } else {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    }
  } else {
    res
      .status(404)
      .json({ message: 'The user with the specified ID does not exist.' });
  }
});

//Custom middleware at the end as a fall back if a route that does not exist is requested
server.use(function (req, res) {
  res.status(404).json({ message: 'Route does not exist' });
});

module.exports = server;
