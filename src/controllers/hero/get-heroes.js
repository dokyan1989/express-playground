const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetHeroes ({ listHeroes }) {
  return async function getHeroes (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const heroes = await listHeroes();
      return {
        headers,
        statusCode: 200,
        body: {
          status: ResponseStatus.SUCCESS,
          data: {
            heroes
          }
        }
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
};
