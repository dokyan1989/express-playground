const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeRegister ({ authService }) {
  return async function register (httpRequest) {
    const { ...userData } = httpRequest.body;
    const user = await authService.register(userData);
    // Create token
    const token = user.getSignedJwtToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      tokenInfo: {
        token,
        options
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { token }
      }
    };
  };
};
