const { ValidationError } = require('$app-helpers/error-types');

module.exports = function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else if (error.name === 'ValidationError') {
    const { message, path: fieldName } = error.errors.name;
    next(new ValidationError(message, fieldName));
  } else {
    next();
  }
};
