module.exports = function makeGetHeroById ({ findHeroById }) {
  return async function getHeroes (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const hero = await findHeroById({ id: httpRequest.params.id });
      return {
        headers,
        statusCode: 200,
        body: hero
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
        statusCode: 404,
        body: {
          error: e.message
        }
      };
    }
  };
};
