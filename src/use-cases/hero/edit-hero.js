const makeHero = require('../../entities/hero');

module.exports = function makeEditHero ({ heroesDb }) {
  return async function editHero ({ id, name } = {}) {
    if (!id) {
      throw new Error('You must supply an id.');
    }

    if (!name) {
      throw new Error('You must supply a name.');
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
