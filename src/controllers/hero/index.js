const heroService = require('../../use-cases/hero');

const makeCreateHero = require('./create-hero');
const makeUpdateHero = require('./update-hero');
const makeDeleteHero = require('./delete-hero');
const makeGetHeroes = require('./get-heroes');
const makeGetHeroById = require('./get-hero-by-id');

const createHero = makeCreateHero({ heroService });
const updateHero = makeUpdateHero({ heroService });
const deleteHero = makeDeleteHero({ heroService });
const getHeroes = makeGetHeroes({ heroService });
const getHeroById = makeGetHeroById({ heroService });

const heroController = Object.freeze({
  createHero,
  updateHero,
  deleteHero,
  getHeroes,
  getHeroById
});

module.exports = heroController;
