const makeHero = require('$app-entities/hero');

module.exports = function makeAddHero ({ heroesDb }) {
  return async function addHero (heroInfo) {
    const hero = makeHero(heroInfo);

    return heroesDb.insert({
      name: hero.getName()
    });
  };
};
