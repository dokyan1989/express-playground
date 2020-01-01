const makeBootcamp = require('../../entities/bootcamp');
const { ValidationError } = require('../../helpers/error-types');

module.exports = function makeCreateBootcamp ({ bootcampsDb }) {
  return async function createBootcamp (bootcampData, user) {
    // Check for published bootcamp
    const publishedBootcamp = await bootcampsDb.findOne({
      userId: user._id
    });

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && user.role !== 'admin') {
      throw new ValidationError(`The user with ID ${user._id} has already published a bootcamp`, 'message');
    }

    const bootcamp = makeBootcamp(bootcampData);
    const createdBootcamp = await bootcampsDb.insert({
      name: bootcamp.getName(),
      description: bootcamp.getDescription(),
      website: bootcamp.getWebsite(),
      phone: bootcamp.getPhone(),
      email: bootcamp.getEmail(),
      address: bootcamp.getAddress(),
      careers: bootcamp.getCareers(),
      housing: bootcamp.getHousing(),
      jobAssistance: bootcamp.getJobAssistance(),
      jobGuarantee: bootcamp.getJobGuarantee(),
      acceptGi: bootcamp.getAcceptGi(),
      createdAt: bootcamp.getCreatedAt(),
      updatedAt: bootcamp.getUpdatedAt(),
      userId: bootcamp.getUserId()
    });

    return createdBootcamp;
  };
};
