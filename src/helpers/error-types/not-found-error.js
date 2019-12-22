class NotFoundError extends Error {
  constructor (message = 'Not found', fieldName = 'unknown') {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.fieldName = fieldName;
  }
};

module.exports = NotFoundError;
