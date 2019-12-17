const makeHeroesDb = require('./heroes-db');
const HEROES = require('../../mock/Heroes');

async function makeDb() {
  return {
    heroes: HEROES
  } ;
}

const heroesDb = makeHeroesDb({ makeDb });
module.exports = heroesDb;
