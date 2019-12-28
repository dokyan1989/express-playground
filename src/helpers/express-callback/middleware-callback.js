const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeMiddlewareCallback (middlewareFunc) {
  return (req, res, next) => {
    middlewareFunc(req)
      .then(httpResponse => {
        if (httpResponse.status === ResponseStatus.SUCCESS) {
          next();
        } else {
          throw new Error('Error from middleware function');
        }
      })
      .catch(error => next(error));
  };
};
