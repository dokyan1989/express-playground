const ResponseStatus = require('$app-constants/ResponseStatus');

module.exports = function makeCreateHero ({ addHero }) {
  return async function createHero (httpRequest) {
    const { name } = httpRequest.body;
    const hero = await addHero({ name });
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
