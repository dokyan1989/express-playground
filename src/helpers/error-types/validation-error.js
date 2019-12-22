class ValidationError extends Error {
  constructor (message = '', fieldName = 'unknown') {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.fieldName = fieldName;
  }
};

module.exports = ValidationError;
