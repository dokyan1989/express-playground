const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateDetails ({ authService, makeTokenResponse }) {
  return async function updateDetails (httpRequest) {
    const fieldsToUpdate = {
      name: httpRequest.body.name,
      email: httpRequest.body.email
    };
    const user = await authService.updateDetails({ id: httpRequest.user._id, ...fieldsToUpdate });
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { user }
      }
    };
  };
};
