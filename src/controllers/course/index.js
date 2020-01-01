const courseService = require('../../use-cases/course');

const makeCreateCourse = require('./create-course');
const makeUpdateCourse = require('./update-course');
const makeDeleteCourse = require('./delete-course');
const makeGetCourses = require('./get-courses');
const makeGetCourseById = require('./get-course-by-id');

const createCourse = makeCreateCourse({ courseService });
const updateCourse = makeUpdateCourse({ courseService });
const deleteCourse = makeDeleteCourse({ courseService });
const getCourses = makeGetCourses({ courseService });
const getCourseById = makeGetCourseById({ courseService });

const courseController = Object.freeze({
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourseById
});

module.exports = courseController;
