const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = async function notFound () {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 404,
    body: {
      status: ResponseStatus.FAIL,
      data: {
        message: 'Route is not found.'
      }
    }
  };
};
