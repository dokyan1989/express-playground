const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetUserById ({ userService }) {
  return async function getUserById (httpRequest) {
    const user = await userService.getUserById({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { user }
      }
    };
  };
};
