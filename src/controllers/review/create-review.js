const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeCreateReview ({ reviewService }) {
  return async function createReview (httpRequest) {
    httpRequest.body.userId = httpRequest.user._id;
    const { ...reviewData } = httpRequest.body;
    const review = await reviewService.createReview(reviewData, httpRequest.user);
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { review }
      }
    };
  };
};
