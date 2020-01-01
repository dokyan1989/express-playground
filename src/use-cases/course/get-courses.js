module.exports = function makeGetCourses ({ coursesDb }) {
  return async function getCourses () {
    const courses = await coursesDb.findAll();
    return courses;
  };
};
