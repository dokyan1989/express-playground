const { ValidationError } = require('../../helpers/error-types');

module.exports = function buildMakeHero () {
  return function makeHero ({
    name,
    createdAt = Date.now(),
    updatedAt = Date.now()
  } = {}) {
    if (!name) {
      throw new ValidationError('Hero must have a name.', 'name');
    }

    return Object.freeze({
      getName: () => name,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
    });
  };
};
