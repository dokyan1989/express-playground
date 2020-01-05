const _ = require('lodash');

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

  async function findAll ({ queryParams = {}, populate = [], isPaged = false } = {}) {
    const db = await makeDb();
    const condition = _.omitBy(queryParams, (value, key) =>
      !value || ['limit', 'page', 'sortBy', 'sortWay', 'includeFields', 'excludeFields'].includes(key));

    let query = db.courses.find(condition);

    // Select fields
    let fields = [];
    if (queryParams.includeFields) {
      fields = fields.concat(queryParams.includeFields.split(','));
    }

    if (queryParams.excludeFields) {
      fields = fields.concat(queryParams.excludeFields.split(','));
    }

    if (fields.length > 0) {
      query = query.select(fields.join(' '));
    }

    // Sort
    if (queryParams.sortBy) {
      const sortObj = {};
      const sortBy = queryParams.sortBy.split(',');
      const sortWay = queryParams.sortWay ? queryParams.sortWay.split(',') : [];
      sortBy.forEach((value, index) => {
        sortObj[value] = parseInt(sortWay[index], 10) || 1;
      });
      query = query.sort(sortObj);
    } else {
      query = query.sort('-createdAt');
    }

    // Populate
    if (populate && populate.length > 0) {
      populate.split(',').forEach(p => {
        query = query.populate(p, 'name');
      });
    }

    if (isPaged) {
      // Pagination
      const page = parseInt(queryParams.page, 10) || 1;
      const limit = parseInt(queryParams.limit, 10) || 10;
      query = query.skip((page - 1) * limit).limit(limit);

      // Counts documents
      const total = await db.courses.find(condition).countDocuments();

      // Executes query
      const courses = await query;

      return {
        totalRecords: total,
        pagination: {
          currentPage: page,
          limit,
          totalPages: Math.ceil(total / limit)
        },
        data: courses
      };
    }

    // Executes query
    const courses = await query;

    return courses;
  }

  async function findById ({ id, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.courses.findById(id);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const course = await query.populate({
      path: 'bootcampId',
      select: 'name description'
    });
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
