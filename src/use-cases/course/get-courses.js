module.exports = function makeGetCourses ({ coursesDb }) {
  return async function getCourses ({ queryParams }) {
    const isPaged = queryParams.isPaged ? queryParams.isPaged : false;
    const populate = queryParams.populate ? queryParams.populate : [];
    delete queryParams.isPaged;
    delete queryParams.populate;

    const courses = await coursesDb.findAll({ queryParams, populate, isPaged });
    return courses;
  };
};
