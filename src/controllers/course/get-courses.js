const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetCourses ({ courseService }) {
  return async function getCourses (httpRequest) {
    let courses = null;
    if (httpRequest.params.bootcampId) {
      courses = await courseService.getCoursesByBootcamp({ bootcampId: httpRequest.params.bootcampId });
    } else {
      courses = await courseService.getCourses();
    }
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { courses }
      }
    };
  };
};
