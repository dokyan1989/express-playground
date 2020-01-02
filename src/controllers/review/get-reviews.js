const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetReviews ({ reviewService }) {
  return async function getReviews (httpRequest) {
    let reviews = null;
    if (httpRequest.params.bootcampId) {
      reviews = await reviewService.getReviewsByBootcamp({ bootcampId: httpRequest.params.bootcampId });
    } else {
      reviews = await reviewService.getReviews();
    }
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { reviews }
      }
    };
  };
};
