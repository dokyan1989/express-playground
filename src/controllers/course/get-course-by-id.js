const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetCourseById ({ courseService }) {
  return async function getCourseById (httpRequest) {
    const course = await courseService.getCourseById({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { course }
      }
    };
  };
};
