const {
  addHero,
  editHero,
  listHeroes,
  removeHero,
  findHeroById
} = require('../../use-cases/hero');

const makeCreateHero = require('./create-hero');
const makeUpdateHero = require('./update-hero');
const makeDeleteHero = require('./delete-hero');
const makeGetHeroes = require('./get-heroes');
const makeGetHeroById = require('./get-hero-by-id');

const createHero = makeCreateHero({ addHero });
const updateHero = makeUpdateHero({ editHero });
const deleteHero = makeDeleteHero({ removeHero });
const getHeroes = makeGetHeroes({ listHeroes });
const getHeroById = makeGetHeroById({ findHeroById });

const heroController = Object.freeze({
  createHero,
  updateHero,
  deleteHero,
  getHeroes,
  getHeroById
});

module.exports = heroController;
