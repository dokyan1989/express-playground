const { ValidationError, NotFoundError, NotAuthorizeError } = require('../../helpers/error-types');

module.exports = function makeDeleteReview ({ reviewsDb }) {
  return async function deleteReview ({ user, id } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    const foundReview = await reviewsDb.findById({ id });
    if (!foundReview) {
      throw new NotFoundError(`Review not found with id of ${id}`, 'message');
    }

    // Make sure user is review owner
    if (foundReview.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new NotAuthorizeError(`User ${user._id} is not authorized to delete this review`);
    }

    await reviewsDb.remove({ id });

    return {
      deletedCount: 1,
      message: 'Review deleted'
    };
  };
};
