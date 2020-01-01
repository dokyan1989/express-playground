const { NotAuthorizeError } = require('../../helpers/error-types');
const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeAuthorize () {
  return function authorize (...roles) {
    return async function (httpRequest) {
      if (!roles.includes(httpRequest.user.role)) {
        throw new NotAuthorizeError(`User role ${httpRequest.user.role} is not authorized to access this route`);
      }

      return { status: ResponseStatus.SUCCESS };
    };
  };
};
