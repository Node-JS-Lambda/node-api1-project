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
  const userExist = checkIfUserExist(id);
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
  const user = req.body;
  user.id = nextID++; //Add an id to each user
  if (user.name && user.bio) {
    //Check if the id already exist
    if (checkIfUserExist(user.id)) {
      res.status(500).json({
        message: 'There was an error while saving the user to the database',
      });
    } else {
      usersArray.push(user);
      res.status(201).json(user);
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
  const userExist = checkIfUserExist(id);
  //Check if user exist
  if (userExist) {
    usersArray.splice(userExist.index, 1); //Delete from array

    res.json({
      message: `User with id ${userExist.user.id} has been deleted.`,
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
  const userExist = checkIfUserExist(id);
  if (userExist) {
    if (data.name && data.bio) {
      usersArray[userExist.index].name = data.name;
      usersArray[userExist.index].bio = data.bio;
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

//Temp DataBase
let nextID = 1;
const usersArray = [];

//Helper method to find users
const checkIfUserExist = (id) => {
  let foundUser = null;
  usersArray.forEach((user, index) => {
    if (user['id'] == id) {
      foundUser = { user: user, index: index };
    }
  });
  return foundUser;
};

module.exports = server;
