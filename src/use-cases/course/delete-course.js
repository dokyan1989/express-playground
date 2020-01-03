const { ValidationError, NotFoundError, UnauthorizedError } = require('../../helpers/error-types');

module.exports = function makeDeleteCourse ({ coursesDb }) {
  return async function deleteCourse ({ user, id } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundCourse = await coursesDb.findById({ id });
    if (!foundCourse) {
      throw new NotFoundError(`Course not found with id of ${id}`);
    }

    // Make sure user is course owner
    if (foundCourse.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new UnauthorizedError(`User ${user._id} is not authorized to delete this course`);
    }

    await coursesDb.remove({ id });

    return {
      deletedCount: 1,
      message: 'Course deleted'
    };
  };
};
