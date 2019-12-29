const makeCreateBootcamp = require('./create-bootcamp');
const makeUpdateBootcamp = require('./update-bootcamp');
const makeGetBootcampById = require('./get-bootcamp-by-id');
const makeGetBootcamps = require('./get-bootcamps');
const makeGetBootcampsInRadius = require('./get-bootcamps-in-radius');
const makeDeleteBootcamp = require('./delete-bootcamp');
const makeUploadPhoto = require('./upload-photo');

const bootcampsDb = require('../../data-access/mongoose/bootcampsDb');

const createBootcamp = makeCreateBootcamp({ bootcampsDb });
const updateBootcamp = makeUpdateBootcamp({ bootcampsDb });
const getBootcampById = makeGetBootcampById({ bootcampsDb });
const getBootcamps = makeGetBootcamps({ bootcampsDb });
const getBootcampsInRadius = makeGetBootcampsInRadius({ bootcampsDb });
const deleteBootcamp = makeDeleteBootcamp({ bootcampsDb });
const uploadPhoto = makeUploadPhoto({ bootcampsDb });

const userService = Object.freeze({
  createBootcamp,
  updateBootcamp,
  getBootcampById,
  getBootcamps,
  getBootcampsInRadius,
  deleteBootcamp,
  uploadPhoto
});

module.exports = userService;
