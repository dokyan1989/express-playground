module.exports = function makeUsersDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    findOne,
    insert,
    remove,
    update
  });

  async function findAll () {
    const db = await makeDb();
    const users = await db.users.find({});
    return users;
  }

  async function findById ({ id }) {
    const db = await makeDb();
    const user = await db.users.findById(id);
    if (!user) {
      return null;
    }
    return user.toJSON();
  }

  async function findOne (condition, selectFields) {
    const db = await makeDb();
    const user = await db.users.findOne(condition).select(selectFields.join(' '));
    if (!user) {
      return null;
    }
    return user.toJSON();
  }

  async function insert ({ ...userData }) {
    const db = await makeDb();
    const user = await db.users.create({ ...userData });
    return user;
  }

  async function remove ({ id }) {
    const db = await makeDb();
    const user = await db.users.findByIdAndDelete(id);
    return user;
  }

  async function update ({ id, ...userData }) {
    const db = await makeDb();
    const user = await db.users.findByIdAndUpdate(id, { ...userData }, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return null;
    }

    return user;
  }
};
