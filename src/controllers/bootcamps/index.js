const bootcampService = require('../../use-cases/bootcamp');

const makeCreateBootcamp = require('./create-bootcamp');
const makeUpdateBootcamp = require('./update-bootcamp');
const makeDeleteBootcamp = require('./delete-bootcamp');
const makeGetBootcamps = require('./get-bootcamps');
const makeGetBootcampById = require('./get-bootcamp-by-id');
const makeGetBootcampsInRadius = require('./get-bootcamps-in-radius');
const makeUploadPhoto = require('./upload-photo');

const createBootcamp = makeCreateBootcamp({ bootcampService });
const updateBootcamp = makeUpdateBootcamp({ bootcampService });
const deleteBootcamp = makeDeleteBootcamp({ bootcampService });
const getBootcamps = makeGetBootcamps({ bootcampService });
const getBootcampById = makeGetBootcampById({ bootcampService });
const getBootcampsInRadius = makeGetBootcampsInRadius({ bootcampService });
const uploadPhoto = makeUploadPhoto({ bootcampService });

const bootcampController = Object.freeze({
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcamps,
  getBootcampById,
  getBootcampsInRadius,
  uploadPhoto
});

module.exports = bootcampController;
