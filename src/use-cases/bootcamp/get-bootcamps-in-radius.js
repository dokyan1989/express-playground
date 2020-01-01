module.exports = function makeGetBootcampsInRadius ({ bootcampsDb }) {
  return async function getBootcampsInRadius ({ lng, lat, radius }) {
    const bootcamps = await bootcampsDb.findInRadius({ lng, lat, radius });
    return bootcamps;
  };
};
