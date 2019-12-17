module.exports = function buildMakeHero() {
  return function makeHero({ name } = {}) {
    if (!name) {
      throw new Error('Hero must have a name.');
    }
    return Object.freeze({
      getName: () => name
    });
  };
}
