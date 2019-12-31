const slugify = require('slugify');
const makeBootcampsDb = require('./bootcamps-db');
const Bootcamp = require('../models/Bootcamp');
const db = require('../db');

async function makeDb () {
  if (!db.isOpen()) {
    await db.connect();
  }
  return {
    bootcamps: Bootcamp
  };
}

const bootcampsDb = makeBootcampsDb({ makeDb, slugify });
module.exports = bootcampsDb;
