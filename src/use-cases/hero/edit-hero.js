const makeHero = require('../../entities/hero');
const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeEditHero ({ heroesDb }) {
  return async function editHero ({ id, name } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    if (!name) {
      throw new ValidationError('You must supply a name.', 'name');
    }

    const foundHero = await heroesDb.findById({ id });
    if (!foundHero) {
      throw new NotFoundError('Hero not found.', 'message');
    }

    const hero = makeHero({ ...foundHero, name, updatedAt: null });
    const updatedHero = await heroesDb.update({
      id,
      name: hero.getName(),
      updatedAt: hero.getUpdatedAt()
    });
    return updatedHero;
  };
};
