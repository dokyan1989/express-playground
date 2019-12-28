const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeGetHeroById ({ heroesDb }) {
  return async function getHeroById ({ id }) {
    const foundHero = await heroesDb.findById({ id });

    if (!foundHero) {
      throw new NotFoundError(`No hero with the id of ${id}`, 'message');
    }
    return foundHero;
  };
};
