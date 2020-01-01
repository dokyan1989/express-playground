module.exports = function makeGetBootcamps ({ bootcampsDb }) {
  return async function getBootcamps () {
    const bootcamps = await bootcampsDb.findAll();
    return bootcamps;
  };
};
