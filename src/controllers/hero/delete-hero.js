const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteHero ({ removeHero }) {
  return async function deleteHero (httpRequest) {
    const deleted = await removeHero({ id: httpRequest.params.id });
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
