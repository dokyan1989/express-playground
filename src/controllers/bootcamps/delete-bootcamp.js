const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteUser ({ userService }) {
  return async function deleteUser (httpRequest) {
    const deleted = await userService.deleteUser({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: deleted
      }
    };
  };
};
