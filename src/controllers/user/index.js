const userService = require('../../use-cases/user');

const makeCreateUser = require('./create-user');
const makeUpdateUser = require('./update-user');
const makeDeleteUser = require('./delete-user');
const makeGetUsers = require('./get-users');
const makeGetUserById = require('./get-user-by-id');

const createUser = makeCreateUser({ userService });
const updateUser = makeUpdateUser({ userService });
const deleteUser = makeDeleteUser({ userService });
const getUsers = makeGetUsers({ userService });
const getUserById = makeGetUserById({ userService });

const userController = Object.freeze({
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById
});

module.exports = userController;
