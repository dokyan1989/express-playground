module.exports = function makeGetHeroById ({ findHeroById }) {
  return async function getHeroes (httpRequest) {
    const hero = await findHeroById({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: hero
    };
  };
};
