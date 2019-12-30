const { NotAuthorize } = require('../../helpers/error-types');
const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeAuthorize () {
  return async function authorize (...roles) {
    return function (httpRequest) {
      if (!roles.includes(httpRequest.user.role)) {
        throw new NotAuthorize(`User role ${httpRequest.user.role} is not authorized to access this route`);
      }

      return { status: ResponseStatus.SUCCESS };
    };
  };
};
