const authService = require('../../use-cases/auth');
const ResponseStatus = require('../../constants/ResponseStatus');

const makeRegister = require('./register');
const makeLogin = require('./login');
const makeLogout = require('./logout');
const makeGetMe = require('./get-me');

const register = makeRegister({ authService, makeTokenResponse });
const login = makeLogin({ authService, makeTokenResponse });
const logout = makeLogout();
const getMe = makeGetMe({ authService });

const authController = Object.freeze({
  register,
  login,
  logout,
  getMe
});

function makeTokenResponse (user, statusCode) {
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
    cookies: [
      {
        name: 'token',
        value: token,
        options
      }
    ],
    statusCode,
    body: {
      status: ResponseStatus.SUCCESS,
      data: { token }
    }
  };
}

module.exports = authController;
