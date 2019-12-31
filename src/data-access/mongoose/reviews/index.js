const slugify = require('slugify');
const makeReviewsDb = require('./reviews-db');
const Review = require('../models/Review');
const db = require('../db');

async function makeDb () {
  if (!db.isOpen()) {
    await db.connect();
  }
  return {
    reviews: Review
  };
}

const reviewsDb = makeReviewsDb({ makeDb, slugify });
module.exports = reviewsDb;
