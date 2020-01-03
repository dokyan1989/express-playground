const makeCourse = require('../../entities/course');
const { NotFoundError, UnauthorizedError } = require('../../helpers/error-types');

module.exports = function makeAddCourse ({ coursesDb, bootcampsDb }) {
  return async function addCourse (courseData, user) {
    const foundBootcamp = await bootcampsDb.findById({ id: courseData.bootcampId });
    if (!foundBootcamp) {
      throw new NotFoundError(`Bootcamp not found with id of ${courseData.bootcampId}`);
    }

    // Make sure user is bootcamp owner
    if (foundBootcamp.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      throw new UnauthorizedError(`User ${user._id} is not authorized to add course to this bootcamp`);
    }

    const course = makeCourse(courseData);
    const createdCourse = await coursesDb.insert({
      title: course.getTitle(),
      description: course.getDescription(),
      weeks: course.getWeeks(),
      tuition: course.getTuition(),
      minimumSkill: course.getMinimumSkill(),
      scholarshipAvailable: course.getScholarshipAvailable(),
      createdAt: course.getCreatedAt(),
      updatedAt: course.getUpdatedAt(),
      userId: course.getUserId(),
      bootcampId: course.getBootcampId()
    });
    return createdCourse;
  };
};
