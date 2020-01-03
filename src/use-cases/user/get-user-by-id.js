const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeGetUserById ({ usersDb }) {
  return async function getUserById ({ id }) {
    const foundUser = await usersDb.findById({ id });

    if (!foundUser) {
      throw new NotFoundError(`No user with the id of ${id}`);
    }
    return foundUser;
  };
};
