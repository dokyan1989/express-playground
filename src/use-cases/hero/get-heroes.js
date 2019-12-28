module.exports = function makeGetHeroes ({ heroesDb }) {
  return async function getHeroes () {
    const heroes = await heroesDb.findAll();
    return heroes;
  };
};
