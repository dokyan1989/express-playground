module.exports = function makeGetCoursesByBootcamp ({ coursesDb }) {
  return async function getCoursesByBootcamp ({ bootcampId }) {
    const courses = await coursesDb.findByBootcamp({ bootcampId });
    return courses;
  };
};
