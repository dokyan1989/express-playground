const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeFindUserById ({ usersDb }) {
  return async function findUserById ({ id }) {
    const foundUser = await usersDb.findById({ id });

    if (!foundUser) {
      throw new NotFoundError(`No user with the id of ${id}`, 'message');
    }
    return foundUser;
  };
};
