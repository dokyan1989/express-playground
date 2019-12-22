const makeHeroesDb = require('./heroes-db');
const db = require('../db');
const Hero = require('../models/Hero');

async function makeDb () {
  if (!db.isOpen()) {
    await db.connect();
  }
  return {
    heroes: Hero
  };
}

const heroesDb = makeHeroesDb({ makeDb });
module.exports = heroesDb;
