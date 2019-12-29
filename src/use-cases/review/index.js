const makeCreateReview = require('./creat-review');
const makeUpdateReview = require('./update-review');
const makeGetReviewById = require('./get-review-by-id');
const makeGetReviews = require('./get-reviews');
const makeDeleteReview = require('./delete-review');
const reviewsDb = require('../../data-access/mongoose/reviewsDb');

const createReview = makeCreateReview({ reviewsDb });
const updateReview = makeUpdateReview({ reviewsDb });
const getReviewById = makeGetReviewById({ reviewsDb });
const getReviews = makeGetReviews({ reviewsDb });
const deleteReview = makeDeleteReview({ reviewsDb });

const reviewService = Object.freeze({
  createReview,
  updateReview,
  getReviewById,
  getReviews,
  deleteReview
});

module.exports = reviewService;
