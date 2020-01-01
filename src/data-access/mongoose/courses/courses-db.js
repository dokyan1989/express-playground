module.exports = function makeCoursesDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    findOne,
    insert,
    remove,
    update,
    getAverageCost,
    findByBootcamp
  });

  async function findAll () {
    const db = await makeDb();
    const courses = await db.courses.find({});
    return courses;
  }

  async function findById ({ id, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.courses.findById(id);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const course = await query;
    if (!course) {
      return null;
    }
    return course.toJSON();
  }

  async function findOne ({ condition, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.courses.findOne(condition);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const course = await query;
    if (!course) {
      return null;
    }
    return course.toJSON();
  }

  async function findByBootcamp ({ bootcampId, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.courses.find({ bootcampId });

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const courses = await query;
    return courses;
  }

  async function insert ({ ...courseData } = {}) {
    const db = await makeDb();
    const course = await db.courses.create({ ...courseData });
    return course;
  }

  async function remove ({ id } = {}) {
    const db = await makeDb();
    const course = await db.courses.findById(id);
    await course.remove();
    return course;
  }

  async function update ({ id, ...courseData } = {}) {
    const db = await makeDb();

    const course = await db.courses.findByIdAndUpdate(id, { ...courseData }, {
      new: true,
      runValidators: true
    });

    if (!course) {
      return null;
    }

    return course;
  }

  async function getAverageCost ({ bootcampId } = {}) {
    const db = await makeDb();

    const obj = await db.courses.aggregate([
      {
        $match: { bootcampId }
      },
      {
        $group: {
          _id: '$bootcampId',
          averageCost: { $avg: '$tuition' }
        }
      }
    ]);

    const averageCost = Math.ceil(obj[0].averageCost / 10) * 10;
    return averageCost;
  }
};
