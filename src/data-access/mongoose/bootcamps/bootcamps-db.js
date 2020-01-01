module.exports = function makeBootcampsDb ({ makeDb, slugify }) {
  return Object.freeze({
    findAll,
    findById,
    findOne,
    findInRadius,
    insert,
    remove,
    update
  });

  async function findAll () {
    const db = await makeDb();
    const bootcamps = await db.bootcamps.find({});
    return bootcamps;
  }

  async function findById ({ id, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.bootcamps.findById(id);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const bootcamp = await query;
    if (!bootcamp) {
      return null;
    }
    return bootcamp.toJSON();
  }

  async function findOne ({ condition, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.bootcamps.findOne(condition);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const bootcamp = await query;
    if (!bootcamp) {
      return null;
    }
    return bootcamp.toJSON();
  }

  async function findInRadius ({ lng, lat, radius, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.bootcamps.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [lng, lat], radius
          ]
        }
      }
    });

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const bootcamps = await query;
    if (!bootcamps) {
      return null;
    }
    return bootcamps;
  }

  async function insert ({ ...bootcampData } = {}) {
    const db = await makeDb();
    const bootcamp = await db.bootcamps.create({ ...bootcampData });
    return bootcamp;
  }

  async function remove ({ id } = {}) {
    const db = await makeDb();
    const bootcamp = await db.bootcamps.findByIdAndDelete(id);
    return bootcamp;
  }

  async function update ({ id, ...bootcampData } = {}) {
    const db = await makeDb();

    if (bootcampData.name) {
      bootcampData.slugName = slugify(bootcampData.name, { lower: true });
    }

    const bootcamp = await db.bootcamps.findByIdAndUpdate(id, { ...bootcampData }, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return null;
    }

    return bootcamp;
  }
};
