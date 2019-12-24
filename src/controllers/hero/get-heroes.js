const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetHeroes ({ listHeroes }) {
  return async function getHeroes (httpRequest) {
    const heroes = await listHeroes();
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
