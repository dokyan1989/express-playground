const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeGetCourseById ({ coursesDb }) {
  return async function getCourseById ({ id }) {
    const foundCourse = await coursesDb.findById({ id });

    if (!foundCourse) {
      throw new NotFoundError(`No course with the id of ${id}`, 'message');
    }
    return foundCourse;
  };
};
