const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteBootcamp ({ bootcampService }) {
  return async function deleteBootcamp (httpRequest) {
    const deleted = await bootcampService.deleteBootcamp({ user: httpRequest.user, id: httpRequest.params.id });
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
