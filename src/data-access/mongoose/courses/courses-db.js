module.exports = function makeCoursesDb ({ makeDb, slugify }) {
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

  async function insert ({ ...courseData } = {}) {
    const db = await makeDb();
    const course = await db.courses.create({ ...courseData });
    return course;
  }

  async function remove ({ id } = {}) {
    const db = await makeDb();
    const course = await db.courses.findByIdAndDelete(id);
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
};
