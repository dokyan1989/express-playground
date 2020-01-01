const { ValidationError, NotFoundError, NotAuthorizeError } = require('../../helpers/error-types');

module.exports = function makeDeleteBootcamp ({ bootcampsDb }) {
  return async function deleteBootcamp ({ user, id } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundBootcamp = await bootcampsDb.findById({ id });
    if (!foundBootcamp) {
      throw new NotFoundError(`Bootcamp not found with id of ${id}`, 'message');
    }

    // Make sure user is bootcamp owner
    if (foundBootcamp.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new NotAuthorizeError(`User ${user._id} is not authorized to delete this bootcamp`);
    }

    await bootcampsDb.remove({ id });
    return {
      deletedCount: 1,
      message: 'Bootcamp deleted'
    };
  };
};
