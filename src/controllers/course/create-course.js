const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeCreateCourse ({ courseService }) {
  return async function createCourse (httpRequest) {
    httpRequest.body.userId = httpRequest.user._id;
    const { ...courseData } = httpRequest.body;
    const course = await courseService.createCourse(courseData, httpRequest.user);
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { course }
      }
    };
  };
};
