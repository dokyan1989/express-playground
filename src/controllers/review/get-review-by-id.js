const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetReviewById ({ reviewService }) {
  return async function getReviewById (httpRequest) {
    const review = await reviewService.getReviewById({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { review }
      }
    };
  };
};
