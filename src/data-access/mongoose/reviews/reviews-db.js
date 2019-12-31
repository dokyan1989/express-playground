module.exports = function makeReviewsDb ({ makeDb, slugify }) {
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
    const reviews = await db.reviews.find({});
    return reviews;
  }

  async function findById ({ id, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.reviews.findById(id);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const review = await query;
    if (!review) {
      return null;
    }
    return review.toJSON();
  }

  async function findOne ({ condition, selectFields = null } = {}) {
    const db = await makeDb();
    let query = db.reviews.findOne(condition);

    if (selectFields && Array.isArray(selectFields) && selectFields.length > 0) {
      query = query.select(selectFields.join(' '));
    }

    const review = await query;
    if (!review) {
      return null;
    }
    return review.toJSON();
  }

  async function insert ({ ...reviewData } = {}) {
    const db = await makeDb();
    const review = await db.reviews.create({ ...reviewData });
    return review;
  }

  async function remove ({ id } = {}) {
    const db = await makeDb();
    const review = await db.reviews.findByIdAndDelete(id);
    return review;
  }

  async function update ({ id, ...reviewData } = {}) {
    const db = await makeDb();

    const review = await db.reviews.findByIdAndUpdate(id, { ...reviewData }, {
      new: true,
      runValidators: true
    });

    if (!review) {
      return null;
    }

    return review;
  }
};
