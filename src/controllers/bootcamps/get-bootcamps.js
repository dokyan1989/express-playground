const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetUsers ({ userService }) {
  return async function getUsers (httpRequest) {
    const users = await userService.getUsers();
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { users }
      }
    };
  };
};
