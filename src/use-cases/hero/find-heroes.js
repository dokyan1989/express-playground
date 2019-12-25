module.exports = function makeFindHeroes ({ heroesDb }) {
  return async function findHeroes () {
    const heroes = await heroesDb.findAll();
    return heroes;
  };
};
