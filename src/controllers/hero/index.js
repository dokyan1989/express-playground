const {
  addHero,
  editHero,
  listHeroes,
  removeHero
} = require('../../use-cases/hero');

const makeCreateHero = require('./create-hero');
const makeUpdateHero = require('./update-hero');
const makeDeleteHero = require('./delete-hero');
const makeGetHeroes = require('./get-heroes');
const notFound = require('./not-found');

const createHero = makeCreateHero({ addHero });
const updateHero = makeUpdateHero({ editHero });
const deleteHero = makeDeleteHero({ removeHero });
const getHeroes = makeGetHeroes({ listHeroes });

const heroController = Object.freeze({
  createHero,
  updateHero,
  deleteHero,
  getHeroes,
  notFound
});

module.exports = heroController;
