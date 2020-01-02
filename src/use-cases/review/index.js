const makeCreateReview = require('./creat-review');
const makeUpdateReview = require('./update-review');
const makeGetReviewById = require('./get-review-by-id');
const makeGetReviews = require('./get-reviews');
const makeDeleteReview = require('./delete-review');
const makeGetReviewByBootcamp = require('./get-reviews-by-bootcamp');

const reviewsDb = require('../../data-access/mongoose/reviewsDb');
const bootcampsDb = require('../../data-access/mongoose/bootcamps');

const createReview = makeCreateReview({ reviewsDb, bootcampsDb });
const updateReview = makeUpdateReview({ reviewsDb, bootcampsDb });
const getReviewById = makeGetReviewById({ reviewsDb });
const getReviews = makeGetReviews({ reviewsDb });
const deleteReview = makeDeleteReview({ reviewsDb });
const getReviewByBootcamp = makeGetReviewByBootcamp({ reviewsDb });

const reviewService = Object.freeze({
  createReview,
  updateReview,
  getReviewById,
  getReviews,
  deleteReview,
  getReviewByBootcamp
});

module.exports = reviewService;
