const makeUser = require('../../entities/user');
const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeUpdateUser ({ usersDb }) {
  return async function updateUser ({ id, ...changes } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundUser = await usersDb.findById({ id });
    if (!foundUser) {
      throw new NotFoundError('User not found');
    }

    const user = makeUser({ ...foundUser, ...changes, updatedAt: undefined });
    const updatedUser = await usersDb.update({
      id,
      ...changes,
      updatedAt: user.getUpdatedAt()
    });

    return updatedUser;
  };
};
