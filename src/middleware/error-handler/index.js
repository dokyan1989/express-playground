const ResponseStatus = require('../../constants/ResponseStatus');

const errorHandler = (err, req, res, next) => {
  res.set('Content-Type', 'application/json');
  console.log(err);
  switch (err.name) {
    case 'MongoError':
      if (err.code === 11000) {
        res.status(400).send({
          status: ResponseStatus.FAIL,
          message: err.message
        });
      }
      break;

    case 'ValidationError':
      res.status(400).send({
        status: ResponseStatus.FAIL,
        data: {
          [err.fieldName]: err.message
        }
      });
      break;

    case 'RangeError':
      res.status(400).send({
        status: ResponseStatus.FAIL,
        message: err.message
      });
      break;

    default:
      res.status(500).send({
        status: ResponseStatus.ERROR,
        message: 'An unkown error occurred.'
      });
  }
};

module.exports = errorHandler;
