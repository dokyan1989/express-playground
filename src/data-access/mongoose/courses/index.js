const slugify = require('slugify');
const makeCoursesDb = require('./courses-db');
const Course = require('../models/Course');
const db = require('../db');

async function makeDb () {
  if (!db.isOpen()) {
    await db.connect();
  }
  return {
    courses: Course
  };
}

const coursesDb = makeCoursesDb({ makeDb, slugify });
module.exports = coursesDb;
