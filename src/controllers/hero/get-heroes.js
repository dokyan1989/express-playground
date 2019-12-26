const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetHeroes ({ findHeroes }) {
  return async function getHeroes (httpRequest) {
    const heroes = await findHeroes();
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
