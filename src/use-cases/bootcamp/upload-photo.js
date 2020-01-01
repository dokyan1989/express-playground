const { ValidationError, NotFoundError, NotAuthorizeError } = require('../../helpers/error-types');
const util = require('util');

module.exports = function makeUploadPhoto ({ bootcampsDb }) {
  return async function uploadPhoto ({ user, id, file }) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundBootcamp = await bootcampsDb.findById({ id });
    if (!foundBootcamp) {
      throw new NotFoundError(`Bootcamp not found with id of ${id}`, 'message');
    }

    // Make sure user is bootcamp owner
    if (foundBootcamp.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new NotAuthorizeError(`User ${user._id} is not authorized to update this bootcamp`);
    }

    const moveFile = util.promisify(file.mv);
    try {
      await moveFile(`${process.env.FILE_UPLOAD_PATH}/${file.name}`);
      const updatedBootcamp = await bootcampsDb.update({
        id,
        photo: file.name,
        updatedAt: Date.now()
      });
      return updatedBootcamp;
    } catch (err) {
      console.error(err);
      throw new Error(`Problem with file upload`);
    }
  };
};
