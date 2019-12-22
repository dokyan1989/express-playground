const ResponseStatus = require('../../constants/ResponseStatus');

const errorHandler = (error, req, res, next) => {
  res.set('Content-Type', 'application/json');
  console.log(error);
  switch (error.name) {
    case 'MongoError':
      if (error.code === 11000) {
        res.status(400).send({
          status: ResponseStatus.FAIL,
          message: error.message
        });
      }
      break;

    case 'ValidationError':
      res.status(400).send({
        status: ResponseStatus.FAIL,
        data: {
          [error.fieldName]: error.message
        }
      });
      break;

    case 'RangeError':
      res.status(400).send({
        status: ResponseStatus.FAIL,
        message: error.message
      });
      break;

    default:
      res.status(500).send({
        status: ResponseStatus.ERROR,
        message: error.message
      });
  }
};

module.exports = errorHandler;
