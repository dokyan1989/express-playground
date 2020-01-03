const ValidationError = require('./validation-error');
const DuplicateError = require('./duplicate-error');
const NotFoundError = require('./not-found-error');
const UnauthorizedError = require('./unauthorized-error');

module.exports = {
  ValidationError,
  DuplicateError,
  NotFoundError,
  UnauthorizedError
};
