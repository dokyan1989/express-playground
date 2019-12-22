// ES6 Class
class AppError extends Error {
  constructor (message, code) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
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

class ValidationError extends Error {
  constructor (message = '', fieldName = 'unknown') {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.fieldName = fieldName;
  }
};

const error = new ValidationError({});
console.log(error);
console.log(error instanceof ValidationError);
