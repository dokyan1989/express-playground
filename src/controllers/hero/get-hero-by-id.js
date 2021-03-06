const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetHeroById ({ heroService }) {
  return async function getHeroById (httpRequest) {
    const hero = await heroService.getHeroById({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { hero }
      }
    };
  };
};
