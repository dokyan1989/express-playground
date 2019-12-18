module.exports = function makeListHeroes ({ heroesDb }) {
  return async function listHeroes () {
    const heroes = await heroesDb.findAll();
    return heroes;
  };
};
