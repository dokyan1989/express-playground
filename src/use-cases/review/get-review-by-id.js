const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeGetReviewById ({ reviewsDb }) {
  return async function getReviewById ({ id }) {
    const foundReview = await reviewsDb.findById({ id });

    if (!foundReview) {
      throw new NotFoundError(`No review with the id of ${id}`, 'message');
    }
    return foundReview;
  };
};
