const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteCourse ({ courseService }) {
  return async function deleteCourse (httpRequest) {
    const deleted = await courseService.deleteCourse({ user: httpRequest.user, id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: deleted
      }
    };
  };
};
