const { ValidationError, DuplicateError } = require('../../../../helpers/error-types');

module.exports = function (err, doc, next) {
  if (isUniqueError(err)) {
    next(new DuplicateError(err.message));
  } else if (err.name === 'ValidationError') {
    const { message, path: fieldName } = err.errors.name;
    next(new ValidationError(message, fieldName));
  } else if (err.name === 'CastError') {
    next(new ValidationError(err.message, err.path));
  } else {
    next();
  }
};

function isUniqueError (err) {
  return err &&
    (err.name === 'BulkWriteError' || err.name === 'MongoError') &&
    (err.code === 11000 || err.code === 11001);
}
