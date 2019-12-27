const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeRemoveUser ({ usersDb }) {
  return async function removeUser ({ id } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an user id.', 'id');
    }

    const deletedUser = await usersDb.remove({ id });
    if (!deletedUser) {
      throw new NotFoundError('User not found, nothing to delete.', 'message');
    }

    return {
      deletedCount: 1,
      message: 'User deleted'
    };
  };
};
