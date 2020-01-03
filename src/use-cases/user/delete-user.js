const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeDeleteUser ({ usersDb }) {
  return async function deleteUser ({ id } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an user id.', 'id');
    }

    const deletedUser = await usersDb.remove({ id });
    if (!deletedUser) {
      throw new NotFoundError('User not found, nothing to delete.');
    }

    return {
      deletedCount: 1,
      message: 'User deleted'
    };
  };
};
