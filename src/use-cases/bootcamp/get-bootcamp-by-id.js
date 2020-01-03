const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeGetBootcampById ({ bootcampsDb }) {
  return async function getBootcampById ({ id }) {
    const foundBootcamp = await bootcampsDb.findById({ id });

    if (!foundBootcamp) {
      throw new NotFoundError(`No bootcamp with the id of ${id}`);
    }
    return foundBootcamp;
  };
};
