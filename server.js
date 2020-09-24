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
  const userExist = checkIfUserExist(id);
  if (userExist) {
    return res.json(userExist);
  }
  res.status(404).json({ message: `User with id ${id} does not exist` });
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

//Delete user
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const userExist = checkIfUserExist(id);
  console.log(`Step 2: ${userExist}`);

  //Check if user exist
  if (userExist) {
    const index = usersArray.indexOf(userExist); //Get index
    usersArray.splice(index, 1); //Delete from array

    res.json({ message: `User with id ${id} has been deleted.` });
  } else {
    //If does not exist show error
    res.status(404).json({
      message: `User with id ${id} does not exist: ${userExist}`,
    });
  }
});

const usersArray = [];

//Helper method to find users
const checkIfUserExist = (id) => {
  let foundUser = null;
  usersArray.forEach((user) => {
    if (user['id'] == id) {
      foundUser = user;
    }
  });
  return foundUser;
};

module.exports = server;
