module.exports = function makeRemoveHero ({ heroesDb }) {
  return async function removeHero ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a hero id.');
    }

    const heroToDelete = await heroesDb.findById({ id });

    if (!heroToDelete) {
      return deleteNothing();
    }

    await heroesDb.remove(heroToDelete);
    return {
      deletedCount: 1,
      message: 'Hero deleted'
    };
  };

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: 'Hero not found, nothing to delete.'
    };
  }
};
