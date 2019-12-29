const makeCreateUser = require('./create-user');
const makeUpdateUser = require('./update-user');
const makeGetUserById = require('./get-user-by-id');
const makeGetUsers = require('./get-users');
const makeDeleteUser = require('./delete-user');
const usersDb = require('../../data-access/mongoose/users');

const createUser = makeCreateUser({ usersDb });
const updateUser = makeUpdateUser({ usersDb });
const getUserById = makeGetUserById({ usersDb });
const getUsers = makeGetUsers({ usersDb });
const deleteUser = makeDeleteUser({ usersDb });

const userService = Object.freeze({
  createUser,
  updateUser,
  getUserById,
  getUsers,
  deleteUser
});

module.exports = userService;
