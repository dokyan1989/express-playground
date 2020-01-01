const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateCourse ({ courseService }) {
  return async function updateCourse (httpRequest) {
    const fieldsToUpdate = Object.assign({}, httpRequest.body);
    Object.keys(fieldsToUpdate).forEach((key) =>
      (fieldsToUpdate[key] === null || fieldsToUpdate[key] === undefined) && delete fieldsToUpdate[key]);
    const course = await courseService.updateCourse({ user: httpRequest.user, id: httpRequest.params.id, ...fieldsToUpdate });
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
