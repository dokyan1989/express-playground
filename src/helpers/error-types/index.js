const ValidationError = require('./validation-error');
const DuplicateError = require('./duplicate-error');
const NotFoundError = require('./not-found-error');
const NotAuthorizeError = require('./not-authorize-error');

module.exports = {
  ValidationError,
  DuplicateError,
  NotFoundError,
  NotAuthorizeError
};
