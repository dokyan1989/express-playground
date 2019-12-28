const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetMe ({ authService }) {
  return async function getMe (httpRequest) {
    const user = await authService.getMe({ id: httpRequest.user._id });
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
