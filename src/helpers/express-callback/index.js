const makeHandlerCallback = require('./handler-callback');
const makeMiddlewareCallback = require('./middleware-callback');

const expressCallback = Object.freeze({
  makeHandlerCallback,
  makeMiddlewareCallback
});

module.exports = expressCallback;
