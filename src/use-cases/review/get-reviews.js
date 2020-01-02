module.exports = function makeGetReviews ({ reviewsDb }) {
  return async function getReviews () {
    const reviews = await reviewsDb.findAll();
    return reviews;
  };
};
