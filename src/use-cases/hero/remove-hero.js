const { ValidationError, NotFoundError } = require('$app-helpers/error-types');

module.exports = function makeRemoveHero ({ heroesDb }) {
  return async function removeHero ({ id } = {}) {
    if (!id) {
      throw new ValidationError('You must supply a hero id.', 'id');
    }

    const heroToDelete = await heroesDb.remove({ id });
    if (!heroToDelete) {
      throw new NotFoundError('Hero not found, nothing to delete.', 'hero');
    }

    return {
      deletedCount: 1,
      message: 'Hero deleted'
    };
  };
};
