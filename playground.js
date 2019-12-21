// ES6 Class
class AppError extends Error {
  constructor (message, code) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.code = code || 0;
  }
};

// Prototype inheritance
function MyError (message, code) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.code = code || 0;
}
MyError.prototype = new Error();
MyError.prototype.constructor = MyError;
