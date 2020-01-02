const makeReview = require('../../entities/review');
const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeAddReview ({ reviewsDb, bootcampsDb }) {
  return async function addReview (reviewData) {
    const foundBootcamp = await bootcampsDb.findById({ id: reviewData.bootcampId });
    if (!foundBootcamp) {
      throw new NotFoundError(`Bootcamp not found with id of ${reviewData.bootcampId}`, 'message');
    }

    const review = makeReview(reviewData);
    const createdReview = await reviewsDb.insert({
      title: review.getTitle,
      text: review.getText,
      rating: review.getRating,
      createdAt: review.getCreatedAt,
      updatedAt: review.getUpdatedAt,
      bootcampId: review.getBootcampId,
      userId: review.getUserId
    });
    return createdReview;
  };
};
