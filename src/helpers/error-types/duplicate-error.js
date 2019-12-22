class DuplicateError extends Error {
  constructor (message = 'There was a duplicate key error', fieldName = 'indexedField') {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.fieldName = fieldName;
  }
};

module.exports = DuplicateError;
