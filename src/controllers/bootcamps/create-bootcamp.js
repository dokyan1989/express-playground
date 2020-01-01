const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeCreateBootcamp ({ bootcampService }) {
  return async function createBootcamp (httpRequest) {
    httpRequest.body.userId = httpRequest.user._id;
    const { ...bootcampData } = httpRequest.body;

    const bootcamp = await bootcampService.createBootcamp(bootcampData, httpRequest.user);
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
