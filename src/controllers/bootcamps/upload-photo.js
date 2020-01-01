const ResponseStatus = require('../../constants/ResponseStatus');
const { ValidationError } = require('../../helpers/error-types');
const path = require('path');

module.exports = function makeUploadPhoto ({ bootcampService }) {
  return async function uploadPhoto (httpRequest) {
    if (!httpRequest.files) {
      throw new ValidationError('Please upload a file', 'photo');
    }

    const file = httpRequest.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      throw new ValidationError('Please upload an image file', 'photo');
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      throw new ValidationError(`Please upload an image less than${process.env.MAX_FILE_UPLOAD}`, 'photo');
    }
    // Create custom filename
    file.name = `photo_${httpRequest.params.id}${path.parse(file.name).ext}`;

    const bootcamp = await bootcampService.uploadPhoto({ user: httpRequest.user, id: httpRequest.params.id, file });
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { bootcamp }
      }
    };
  };
};
