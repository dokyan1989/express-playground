const ResponseStatus = require('$app-constants/ResponseStatus');

module.exports = function makeUpdateHero ({ editHero }) {
  return async function updateHero (httpRequest) {
    const { name } = httpRequest.body;
    const hero = await editHero({ id: httpRequest.params.id, name });

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
