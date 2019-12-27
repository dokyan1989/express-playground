const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeFindHeroById ({ heroesDb }) {
  return async function findHeroById ({ id }) {
    const foundHero = await heroesDb.findById({ id });

    if (!foundHero) {
      throw new NotFoundError(`No hero with the id of ${id}`, 'message');
    }
    return foundHero;
  };
};
