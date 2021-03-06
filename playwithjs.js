// // ES6 Class
// class AppError extends Error {
//   constructor (message, code) {
//     super(message);
//     Error.captureStackTrace(this, this.constructor);
//     this.name = this.constructor.name;
//     this.code = code || 0;
//   }
// };

// // Prototype inheritance
// function MyError (message, code) {
//   Error.call(this, message);
//   Error.captureStackTrace(this, this.constructor);
//   this.name = this.constructor.name;
//   this.code = code || 0;
// }
// MyError.prototype = new Error();
// MyError.prototype.constructor = MyError;
// function sum (a, b) {
//   return a + b;
// }
// module.exports = sum;

// function asyncHandler (fn) {
//   return function (a, b) {
//     return Promise.resolve(fn(a, b)).catch(error => console.log(error));
//   };
// }

const redis = require('redis');
const client = redis.createClient();

client.on('error', function (err) {
  console.log('Error ' + err);
});

client.rpush('list-key', 'item', redis.print);
client.rpush('list-key', 'item2', redis.print);
client.rpush('list-key', 'item', redis.print);
