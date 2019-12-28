const makeHero = require('../../entities/hero');

module.exports = function makeCreateHero ({ heroesDb }) {
  return async function createHero (heroData) {
    const hero = makeHero(heroData);

    const createdHero = await heroesDb.insert({
      name: hero.getName(),
      createdAt: hero.getCreatedAt(),
      updatedAt: hero.getUpdatedAt()
    });

    return createdHero;
  };
};
