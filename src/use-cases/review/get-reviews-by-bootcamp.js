module.exports = function makeGetReviewsByBootcamp ({ reviewsDb }) {
  return async function getReviewsByBootcamp ({ bootcampId }) {
    const reviews = await reviewsDb.findByBootcamp({ bootcampId });
    return reviews;
  };
};
