const makeHero = require('../../entities/hero');
const { ValidationError } = require('../../helpers/error-types');

module.exports = function makeEditHero ({ heroesDb }) {
  return async function editHero ({ id, name } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    if (!name) {
      throw new ValidationError('You must supply a name.', 'name');
    }

    const existing = await heroesDb.findById({ id });

    if (!existing) {
      throw new RangeError('Hero not found.');
    }

    const hero = makeHero({ name });
    const updated = await heroesDb.update({
      id,
      name: hero.getName()
    });
    return updated;
  };
};
