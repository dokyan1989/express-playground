const express = require('express');
const router = express.Router({ mergeParams: true });
const { makeHandlerCallback, makeMiddlewareCallback } = require('../../../helpers/express-callback');
const {
  createReview,
  deleteReview,
  updateReview,
  getReviews,
  getReviewById
} = require('../../../controllers/review');

const { protect, authorize } = require('../../../middleware/auth');

router.get('/', makeHandlerCallback(getReviews));
router.get('/:id', makeHandlerCallback(getReviewById));
router.post('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('user', 'admin')),
  makeHandlerCallback(createReview));
router.put('/:id',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('user', 'admin')),
  makeHandlerCallback(updateReview));
router.put('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('user', 'admin')),
  makeHandlerCallback(updateReview));
router.delete('/:id',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('user', 'admin')),
  makeHandlerCallback(deleteReview));
router.delete('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('user', 'admin')),
  makeHandlerCallback(deleteReview));

module.exports = router;
