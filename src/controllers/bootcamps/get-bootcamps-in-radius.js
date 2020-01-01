const ResponseStatus = require('../../constants/ResponseStatus');
const geocoder = require('../../helpers/geocoder');

module.exports = function makeGetBootcampsInRadius ({ bootcampService }) {
  return async function getBootcampsInRadius (httpRequest) {
    const { zipcode, distance } = httpRequest.params;
    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide distance by radius of Earth
    // Earth Radius = 3,963 miles / 6,378 km
    const radius = distance / 3963;

    const bootcamps = await bootcampService.getBootcampsInRadius({ lng, lat, radius });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { bootcamps }
      }
    };
  };
};
