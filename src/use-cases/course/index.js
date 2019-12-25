const makeAddCourse = require('./add-course');
const makeEditCourse = require('./edit-course');
const makeFindCourseById = require('./find-course-by-id');
const makeFindCourses = require('./find-courses');
const makeRemoveCourse = require('./remove-course');
const coursesDb = require('../../data-access/mongoose/coursesDb');

const addCourse = makeAddCourse({ coursesDb });
const editCourse = makeEditCourse({ coursesDb });
const findCourseById = makeFindCourseById({ coursesDb });
const findCourses = makeFindCourses({ coursesDb });
const removeCourse = makeRemoveCourse({ coursesDb });

const courseService = Object.freeze({
  addCourse,
  editCourse,
  findCourseById,
  findCourses,
  removeCourse
});

module.exports = courseService;
