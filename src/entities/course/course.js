module.exports = function buildMakeCourse () {
  return function makeCourse ({
    title,
    description,
    weeks,
    tuition,
    minimumSkill,
    scholarshipAvailable,
    createdAt = Date.now(),
    updatedAt = Date.now(),
    userId,
    bootcampId
  } = {}) {
    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getWeeks: () => weeks,
      getTuition: () => tuition,
      getMinimumSkill: () => minimumSkill,
      getScholarshipAvailable: () => scholarshipAvailable,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getUserId: () => userId,
      getBootcampId: () => bootcampId
    });
  };
};
