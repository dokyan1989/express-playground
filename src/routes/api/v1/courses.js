const express = require('express');
const router = express.Router({ mergeParams: true });
const { makeHandlerCallback, makeMiddlewareCallback } = require('../../../helpers/express-callback');
const {
  createCourse,
  deleteCourse,
  updateCourse,
  getCourses,
  getCourseById
} = require('../../../controllers/course');

const { protect, authorize } = require('../../../middleware/auth');

router.get('/', makeHandlerCallback(getCourses));
router.get('/:id', makeHandlerCallback(getCourseById));
router.post('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(createCourse));
router.put('/:id',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(updateCourse));
router.put('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(updateCourse));
router.delete('/:id',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(deleteCourse));
router.delete('/',
  makeMiddlewareCallback(protect),
  makeMiddlewareCallback(authorize('publisher', 'admin')),
  makeHandlerCallback(deleteCourse));

module.exports = router;
