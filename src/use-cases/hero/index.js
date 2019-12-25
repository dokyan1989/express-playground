const makeAddHero = require('./add-hero');
const makeEditHero = require('./edit-hero');
const makeFindHeroes = require('./find-heroes');
const makeRemoveHero = require('./remove-hero');
const makeFindHeroById = require('./find-hero-by-id');
const heroesDb = require('../../data-access/mongoose/heroes');

const addHero = makeAddHero({ heroesDb });
const editHero = makeEditHero({ heroesDb });
const findHeroes = makeFindHeroes({ heroesDb });
const removeHero = makeRemoveHero({ heroesDb });
const findHeroById = makeFindHeroById({ heroesDb });

const heroService = Object.freeze({
  addHero,
  editHero,
  findHeroes,
  removeHero,
  findHeroById
});

module.exports = heroService;
