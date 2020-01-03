const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeGetMe ({ usersDb }) {
  return async function getMe ({ id }) {
    const foundUser = await usersDb.findById({ id });

    if (!foundUser) {
      throw new NotFoundError(`No user with the id of ${id}`);
    }
    return foundUser;
  };
};
