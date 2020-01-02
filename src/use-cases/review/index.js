const makeCreateReview = require('./create-review');
const makeUpdateReview = require('./update-review');
const makeGetReviewById = require('./get-review-by-id');
const makeGetReviews = require('./get-reviews');
const makeDeleteReview = require('./delete-review');
const makeGetReviewsByBootcamp = require('./get-reviews-by-bootcamp');

const reviewsDb = require('../../data-access/mongoose/reviews');
const bootcampsDb = require('../../data-access/mongoose/bootcamps');

const createReview = makeCreateReview({ reviewsDb, bootcampsDb });
const updateReview = makeUpdateReview({ reviewsDb, bootcampsDb });
const getReviewById = makeGetReviewById({ reviewsDb });
const getReviews = makeGetReviews({ reviewsDb });
const deleteReview = makeDeleteReview({ reviewsDb });
const getReviewsByBootcamp = makeGetReviewsByBootcamp({ reviewsDb });

const reviewService = Object.freeze({
  createReview,
  updateReview,
  getReviewById,
  getReviews,
  deleteReview,
  getReviewsByBootcamp
});

module.exports = reviewService;
