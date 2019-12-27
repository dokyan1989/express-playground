const makeHero = require('../../entities/hero');

module.exports = function makeAddHero ({ heroesDb }) {
  return async function addHero (heroData) {
    const hero = makeHero(heroData);

    const createdHero = await heroesDb.insert({
      name: hero.getName(),
      createdAt: hero.createdAt(),
      updatedAt: hero.getUpdatedAt()
    });

    return createdHero;
  };
};
