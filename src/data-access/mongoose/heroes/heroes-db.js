module.exports = function makeHeroesDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    insert,
    remove,
    update
  });

  async function findAll () {
    const db = await makeDb();
    const heroes = await db.heroes.find({});
    return heroes;
  }

  async function findById ({ id }) {
    const db = await makeDb();
    const hero = await db.heroes.findById(id);
    if (!hero) {
      return null;
    }
    return hero.toJSON();
  }

  async function insert ({ name }) {
    const db = await makeDb();
    const hero = await db.heroes.create({ name });
    return hero;
  }

  async function remove ({ id }) {
    const db = await makeDb();
    const hero = await db.heroes.findByIdAndDelete(id);
    return hero;
  }

  async function update ({ id, name }) {
    const db = await makeDb();
    const hero = await db.heroes.findByIdAndUpdate(id, { name }, {
      new: true,
      runValidators: true
    });

    if (!hero) {
      return null;
    }

    return hero;
  }
};
