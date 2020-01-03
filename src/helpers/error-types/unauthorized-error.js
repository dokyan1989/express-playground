class UnauthorizedError extends Error {
  constructor (message = 'Not authorize to access this route') {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
  }
};

module.exports = UnauthorizedError;
