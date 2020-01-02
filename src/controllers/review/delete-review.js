const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteReview ({ reviewService }) {
  return async function deleteReview (httpRequest) {
    const deleted = await reviewService.deleteReview({ user: httpRequest.user, id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: deleted
      }
    };
  };
};
