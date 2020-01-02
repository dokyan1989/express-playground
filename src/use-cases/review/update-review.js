const makeReview = require('../../entities/review');
const { ValidationError, NotFoundError, NotAuthorizeError } = require('../../helpers/error-types');

module.exports = function makeUpdateReview ({ reviewsDb, bootcampsDb }) {
  return async function updateReview ({ user, id, ...changes } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundReview = await reviewsDb.findById({ id });
    if (!foundReview) {
      throw new NotFoundError(`Review not found with id of ${id}`, 'message');
    }

    // Make sure user is review owner
    if (foundReview.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new NotAuthorizeError(`User ${user._id} is not authorized to update this review`);
    }

    const review = makeReview({ ...foundReview, ...changes, updatedAt: undefined });
    const updatedReview = await reviewsDb.update({
      id,
      ...changes,
      updatedAt: review.getUpdatedAt()
    });

    const averageRating = await reviewsDb.getAverageRating({ bootcampId: updatedReview.bootcampId });

    await bootcampsDb.update({
      id: updatedReview.bootcampId,
      averageRating,
      updatedAt: Date.now()
    });

    return updatedReview;
  };
};
