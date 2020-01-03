class NotFoundError extends Error {
  constructor (message = 'Something not found') {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
  }
};

module.exports = NotFoundError;
