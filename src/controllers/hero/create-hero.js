const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeCreateHero ({ heroService }) {
  return async function createHero (httpRequest) {
    const { name } = httpRequest.body;
    const hero = await heroService.createHero({ name });
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { hero }
      }
    };
  };
};
