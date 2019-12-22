const { ValidationError } = require('$app-helpers/error-types');

module.exports = function buildMakeHero () {
  return function makeHero ({ name } = {}) {
    if (!name) {
      throw new ValidationError('Hero must have a name.', 'name');
    }
    return Object.freeze({
      getName: () => name
    });
  };
};
