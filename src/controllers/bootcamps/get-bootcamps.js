const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetBoocamps ({ bootcampService }) {
  return async function getBoocamps (httpRequest) {
    const bootcamps = await bootcampService.getBootcamps();
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { bootcamps }
      }
    };
  };
};
