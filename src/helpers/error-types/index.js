const ValidationError = require('./validation-error');
const DuplicateError = require('./duplicate-error');
const NotFoundError = require('./not-found-error');
const NotAuthorize = require('./not-authorize');

module.exports = {
  ValidationError,
  DuplicateError,
  NotFoundError,
  NotAuthorize
};
