const createUser = (data) => {
  //write code to add a new user
  data.id = nextID++; //Add an id to each user
  usersArray.push(data);
  return data;
};

const getAllUsers = () => {
  return usersArray;
};

const getUser = (id) => {
  let foundUser = null;
  usersArray.forEach((user, index) => {
    if (user['id'] == id) {
      foundUser = { user: user, index: index };
    }
  });
  return foundUser;
};

const deleteUser = (id) => {
  //write code to add a new user
  const userExist = getUser(id);
  if (userExist) {
    usersArray.splice(userExist.index, 1); //Delete from array
  }
  return userExist;
};

const updateUser = (id, data) => {
  //write code to add a new user
  const userExist = getUser(id);
  if (userExist) {
    usersArray[userExist.index].name = data.name;
    usersArray[userExist.index].bio = data.bio;
  }
  return userExist;
};

//Temp DataBase
let nextID = 3;
const usersArray = [
  {
    name: 'Fritz',
    bio: 'Not Tarzan',
    id: 1,
  },
  {
    name: 'Anna',
    bio: "Not Tarzan's Wife, another Jane",
    id: 2,
  },
  {
    name: 'Kristen',
    bio: 'Cool girl',
    id: 3,
  },
];

exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
