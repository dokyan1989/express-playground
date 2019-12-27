const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeLogout () {
  return async function logout (_, res) {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { message: 'Logout successfully' }
      }
    };
  };
};
