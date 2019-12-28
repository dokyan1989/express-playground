const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetHeroes ({ heroService }) {
  return async function getHeroes (httpRequest) {
    const heroes = await heroService.getHeroes();
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { heroes }
      }
    };
  };
};
