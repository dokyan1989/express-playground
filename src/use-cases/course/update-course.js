const makeCourse = require('../../entities/course');
const { ValidationError, NotFoundError, UnauthorizedError } = require('../../helpers/error-types');

module.exports = function makeUpdateCourse ({ coursesDb, bootcampsDb }) {
  return async function updateCourse ({ user, id, ...changes } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundCourse = await coursesDb.findById({ id });
    if (!foundCourse) {
      throw new NotFoundError(`Course not found with id of ${id}`);
    }

    // Make sure user is course owner
    if (foundCourse.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new UnauthorizedError(`User ${user._id} is not authorized to update this course`);
    }

    const course = makeCourse({ ...foundCourse, ...changes, updatedAt: undefined });
    const updatedCourse = await coursesDb.update({
      id,
      ...changes,
      updatedAt: course.getUpdatedAt()
    });

    const averageCost = await coursesDb.getAverageCost({ bootcampId: updatedCourse.bootcampId });

    await bootcampsDb.update({
      id: updatedCourse.bootcampId,
      averageCost,
      updatedAt: Date.now()
    });

    return updatedCourse;
  };
};
