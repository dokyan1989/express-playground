const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeRemoveHero ({ heroesDb }) {
  return async function removeHero ({ id } = {}) {
    if (!id) {
      throw new ValidationError('You must supply a hero id.', 'id');
    }

    const deletedHero = await heroesDb.remove({ id });
    if (!deletedHero) {
      throw new NotFoundError('Hero not found, nothing to delete.', 'message');
    }

    return {
      deletedCount: 1,
      message: 'Hero deleted'
    };
  };
};
