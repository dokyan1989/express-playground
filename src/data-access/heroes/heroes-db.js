module.exports = function makeHeroesDb({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    insert,
    remove,
    update
  });

  async function findAll() {
    const db = await makeDb();
    return db['heroes'];
  }

  async function findById({ id }) {
    const db = await makeDb();
    const index = db['heroes'].findIndex(hero => hero.id === parseInt(id));
    if (index > -1) {
      return db['heroes'][index];
    }
    return null;
  }

  async function insert({ name }) {
    const db = await makeDb();
    const newHero = {
      id: genId(),
      name
    };
    db['heroes'].push(newHero);
    return newHero;
  }

  async function remove({ id }) {
    const db = await makeDb();
    const deleteIndex = db['heroes'].findIndex(
      hero => hero.id === parseInt(id)
    );
    if (deleteIndex > -1) {
      db['heroes'].splice(deleteIndex, 1);
      return 1;
    }

    return 0;
  }

  async function update({ id, name }) {
    const db = await makeDb();
    const updateIndex = db['heroes'].findIndex(
      hero => hero.id === parseInt(id)
    );
    if (updateIndex > -1) {
      db['heroes'][updateIndex].name = name;
      return db['heroes'][updateIndex];
    }
    return null;
  }

  function genId() {
    return db['heroes'].length > 0
      ? Math.max(...db['heroes'].map(hero => hero.id)) + 1
      : 11;
  }
};
