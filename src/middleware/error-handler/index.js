const ResponseStatus = require('../../constants/ResponseStatus');

const errorHandler = (err, req, res, next) => {
  res.set('Content-Type', 'application/json');
  console.log(err);
  switch (err.name) {
    case 'ValidationError':
    case 'DuplicateError':
    case 'NotFoundError':
      res.status(400).send({
        status: ResponseStatus.FAIL,
        data: {
          [err.fieldName]: err.message
        }
      });
      break;

    default:
      res.status(500).send({
        status: ResponseStatus.ERROR,
        message: err.message
      });
  }
};

module.exports = errorHandler;
