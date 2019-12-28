const makeCreateHero = require('./create-hero');
const makeUpdateHero = require('./update-hero');
const makeDeleteHero = require('./delete-hero');
const makeGetHeroes = require('./get-heroes');
const makeGetHeroById = require('./get-hero-by-id');
const heroesDb = require('../../data-access/mongoose/heroes');

const createHero = makeCreateHero({ heroesDb });
const updateHero = makeUpdateHero({ heroesDb });
const deleteHero = makeDeleteHero({ heroesDb });
const getHeroes = makeGetHeroes({ heroesDb });
const getHeroById = makeGetHeroById({ heroesDb });

const heroService = Object.freeze({
  createHero,
  updateHero,
  deleteHero,
  getHeroes,
  getHeroById
});

module.exports = heroService;
