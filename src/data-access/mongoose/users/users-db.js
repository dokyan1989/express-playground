module.exports = function makeUsersDb ({ makeDb, bcrypt, slugify }) {
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

  async function findById ({ id, selectFields = null }) {
    const db = await makeDb();
    let query = db.users.findById(id);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const user = await query;
    if (!user) {
      return null;
    }
    return user.toJSON();
  }

  async function findOne ({ condition, selectFields = null }) {
    const db = await makeDb();
    let query = db.users.findOne(condition);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const user = await query;
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

    if (userData.name) {
      userData.slugName = slugify(userData.name, { lower: true });
    }

    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

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
