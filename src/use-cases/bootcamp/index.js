const makeAddBootcamp = require('./add-bootcamp');
const makeEditBootcamp = require('./edit-bootcamp');
const makeFindBootcampById = require('./find-bootcamp-by-id');
const makeFindBootcamps = require('./find-bootcamps');
const makeFindBootcampsInRadius = require('./find-bootcamps-in-radius');
const makeRemoveBootcamp = require('./remove-bootcamp');
const makeUploadPhoto = require('./upload-photo');
const bootcampsDb = require('../../data-access/mongoose/bootcampsDb');

const addBootcamp = makeAddBootcamp({ bootcampsDb });
const editBootcamp = makeEditBootcamp({ bootcampsDb });
const findBootcampById = makeFindBootcampById({ bootcampsDb });
const findBootcamps = makeFindBootcamps({ bootcampsDb });
const findBootcampsInRadius = makeFindBootcampsInRadius({ bootcampsDb });
const removeBootcamp = makeRemoveBootcamp({ bootcampsDb });
const uploadPhoto = makeUploadPhoto({ bootcampsDb });

const userService = Object.freeze({
  addBootcamp,
  editBootcamp,
  findBootcampById,
  findBootcamps,
  findBootcampsInRadius,
  removeBootcamp,
  uploadPhoto
});

module.exports = userService;
