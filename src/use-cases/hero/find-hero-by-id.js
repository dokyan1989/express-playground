const { NotFoundError } = require('$app-helpers/error-types');

module.exports = function makeFindHeroById ({ heroesDb }) {
  return async function findHeroById ({ id }) {
    const hero = await heroesDb.findById({ id });

    if (!hero) {
      throw new NotFoundError(`No hero with the id of ${id}`, 'hero');
    }
    return hero;
  };
};
