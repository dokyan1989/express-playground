const makeBootcamp = require('../../entities/bootcamp');
const { ValidationError, NotFoundError, UnauthorizedError } = require('../../helpers/error-types');

module.exports = function makeEditBootcamp ({ bootcampsDb }) {
  return async function editBootcamp ({ user, id, ...changes } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundBootcamp = await bootcampsDb.findById({ id });
    if (!foundBootcamp) {
      throw new NotFoundError(`Bootcamp not found with id of ${id}`);
    }

    // Make sure user is bootcamp owner
    if (foundBootcamp.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new UnauthorizedError(`User ${user._id} is not authorized to update this bootcamp`);
    }

    const bootcamp = makeBootcamp({ ...foundBootcamp, ...changes, updatedAt: undefined });
    const updatedBootcamp = await bootcampsDb.update({
      id,
      ...changes,
      updatedAt: bootcamp.getUpdatedAt()
    });

    return updatedBootcamp;
  };
};
