const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteHero ({ heroService }) {
  return async function deleteHero (httpRequest) {
    const deleted = await heroService.deleteHero({ id: httpRequest.params.id });
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
