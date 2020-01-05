const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetCourses ({ courseService }) {
  return async function getCourses (httpRequest) {
    const queryParams = httpRequest.query;

    if (httpRequest.params.bootcampId) {
      queryParams.bootcampId = httpRequest.params.bootcampId;
    }

    const courses = await courseService.getCourses({ queryParams });

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
