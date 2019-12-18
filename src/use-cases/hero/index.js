const makeAddHero = require('./add-hero');
const makeEditHero = require('./edit-hero');
const makeListHeroes = require('./list-heroes');
const makeRemoveHero = require('./remove-hero');
const makeFindHeroById = require('./find-hero-by-id');
const heroesDb = require('../../data-access/heroes');

const addHero = makeAddHero({ heroesDb });
const editHero = makeEditHero({ heroesDb });
const listHeroes = makeListHeroes({ heroesDb });
const removeHero = makeRemoveHero({ heroesDb });
const findHeroById = makeFindHeroById({ heroesDb });

const heroService = Object.freeze({
  addHero,
  editHero,
  listHeroes,
  removeHero,
  findHeroById
});

module.exports = heroService;
