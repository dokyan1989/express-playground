const express = require('express');
const router = express.Router();
const { makeHandlerCallback, makeMiddlewareCallback } = require('../../../helpers/express-callback');
const {
  createBootcamp,
  deleteBootcamp,
  updateBootcamp,
  getBootcamps,
  getBootcampById,
  getBootcampsInRadius,
  uploadPhoto
} = require('../../../controllers/bootcamps');

const { protect, authorize } = require('../../../middleware/auth');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.get('/', makeHandlerCallback(getBootcamps));
router.get('/:id', makeHandlerCallback(getBootcampById));
router.get('/radius/:zipcode/:distance', makeHandlerCallback(getBootcampsInRadius));

router.post('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(createBootcamp));

router.put('/:id/photo',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')), makeHandlerCallback(uploadPhoto));

router.put('/:id',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')), makeHandlerCallback(updateBootcamp));
router.put('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')), makeHandlerCallback(updateBootcamp));

router.delete('/:id',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(deleteBootcamp));
router.delete('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(deleteBootcamp));

module.exports = router;
