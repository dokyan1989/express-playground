const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');
const makeFindUserById = require('./find-user-by-id');
const makeFindUsers = require('./find-users');
const makeRemoveUser = require('./remove-user');
const usersDb = require('../../data-access/mongoose/users');

const addUser = makeAddUser({ usersDb });
const editUser = makeEditUser({ usersDb });
const findUserById = makeFindUserById({ usersDb });
const findUsers = makeFindUsers({ usersDb });
const removeUser = makeRemoveUser({ usersDb });

const userService = Object.freeze({
  addUser,
  editUser,
  findUserById,
  findUsers,
  removeUser
});

module.exports = userService;
