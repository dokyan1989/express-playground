const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetBootcampById ({ bootcampService }) {
  return async function getBootcampById (httpRequest) {
    const bootcamp = await bootcampService.getBootcampById({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { bootcamp }
      }
    };
  };
};
