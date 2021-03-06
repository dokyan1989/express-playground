const makeCreateCourse = require('./create-course');
const makeUpdateCourse = require('./update-course');
const makeGetCourseById = require('./get-course-by-id');
const makeGetCourses = require('./get-courses');
const makeDeleteCourse = require('./delete-course');

const coursesDb = require('../../data-access/mongoose/courses');
const bootcampsDb = require('../../data-access/mongoose/bootcamps');

const createCourse = makeCreateCourse({ coursesDb, bootcampsDb });
const updateCourse = makeUpdateCourse({ coursesDb, bootcampsDb });
const getCourseById = makeGetCourseById({ coursesDb });
const getCourses = makeGetCourses({ coursesDb });
const deleteCourse = makeDeleteCourse({ coursesDb });

const courseService = Object.freeze({
  createCourse,
  updateCourse,
  getCourseById,
  getCourses,
  deleteCourse
});

module.exports = courseService;
