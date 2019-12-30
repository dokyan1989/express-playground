const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateUser ({ userService }) {
  return async function updateUser (httpRequest) {
    const fieldsToUpdate = {
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      role: httpRequest.body.role
    };

    const user = await userService.updateUser({ id: httpRequest.user._id, ...fieldsToUpdate });
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
