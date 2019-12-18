module.exports = function makeFindHeroById({ heroesDb }) {
  return async function findHeroById({ id }) {
    const hero = await heroesDb.findById({ id });

    if (!hero) {
      throw new Error(`No hero with the id of ${id}`);
    }
    return hero;
  };
};