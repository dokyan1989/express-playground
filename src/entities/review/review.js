module.exports = function buildMakeReview () {
  return function makeReview ({
    title,
    text,
    rating,
    createdAt = Date.now(),
    updatedAt = Date.now(),
    bootcampId,
    userId
  } = {}) {
    return Object.freeze({
      getTitle: () => title,
      getText: () => text,
      getRating: () => rating,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getBootcampId: () => bootcampId,
      getUserId: () => userId
    });
  };
};
