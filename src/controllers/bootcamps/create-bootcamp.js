const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeCreateUser ({ userService }) {
  return async function createUser (httpRequest) {
    const { ...userData } = httpRequest.body;
    const user = await userService.createUser(userData);
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
