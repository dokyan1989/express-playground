const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateUser ({ userService }) {
  return async function updateUser (httpRequest) {
    const fieldsToUpdate = {
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      role: httpRequest.body.role
    };
    Object.keys(fieldsToUpdate).forEach((key) =>
      (fieldsToUpdate[key] === null || fieldsToUpdate[key] === undefined) && delete fieldsToUpdate[key]);
    const user = await userService.updateUser({ id: httpRequest.params.id, ...fieldsToUpdate });
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
