const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeLogout () {
  return async function logout (httpRequest) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      cookies: [
        {
          name: 'token',
          value: 'none',
          options: {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
          }
        }
      ],
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { message: 'Logout successfully' }
      }
    };
  };
};
