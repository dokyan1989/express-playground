const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateBootcamp ({ bootcampService }) {
  return async function updateBootcamp (httpRequest) {
    const fieldsToUpdate = Object.assign({}, httpRequest.body);

    Object.keys(fieldsToUpdate).forEach((key) =>
      (fieldsToUpdate[key] === null || fieldsToUpdate[key] === undefined) && delete fieldsToUpdate[key]);

    const bootcamp = await bootcampService.updateBootcamp({ user: httpRequest.user, id: httpRequest.params.id, ...fieldsToUpdate });
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { bootcamp }
      }
    };
  };
};
