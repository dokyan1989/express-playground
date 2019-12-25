const makeAddReview = require('./add-review');
const makeEditReview = require('./edit-review');
const makeFindReviewById = require('./find-review-by-id');
const makeFindReviews = require('./find-reviews');
const makeRemoveReview = require('./remove-review');
const reviewsDb = require('../../data-access/mongoose/reviewsDb');

const addReview = makeAddReview({ reviewsDb });
const editReview = makeEditReview({ reviewsDb });
const findReviewById = makeFindReviewById({ reviewsDb });
const findReviews = makeFindReviews({ reviewsDb });
const removeReview = makeRemoveReview({ reviewsDb });

const reviewService = Object.freeze({
  addReview,
  editReview,
  findReviewById,
  findReviews,
  removeReview
});

module.exports = reviewService;
