const ResponseStatus = require('../../constants/ResponseStatus');

const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'ValidationError':
    case 'DuplicateError':
      res.status(400).json({
        status: ResponseStatus.FAIL,
        data: {
          field: err.fieldName,
          message: err.message
        }
      });
      break;

    case 'NotFoundError':
      res.status(404).json({
        status: ResponseStatus.FAIL,
        data: {
          message: err.message
        }
      });
      break;

    case 'UnauthorizedError':
      res.status(401).json({
        status: ResponseStatus.FAIL,
        data: {
          message: err.message
        }
      });
      break;

    default:
      res.status(500).json({
        status: ResponseStatus.ERROR,
        message: err.message
      });
  }
};

module.exports = errorHandler;
