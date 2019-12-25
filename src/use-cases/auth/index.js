const makeForgotPassword = require('./forgot-password');
const makeGetMe = require('./get-me');
const makeLogin = require('./login');
const makeLogout = require('./logout');
const makeRegister = require('./register');
const makeResetPassword = require('./reset-password');
const makeUpdateDetails = require('./update-details');
const makeUpdatePassword = require('./update-password');
const usersDb = require('../../data-access/mongoose/usersDb');

const forgotPassword = makeForgotPassword({ usersDb });
const getMe = makeGetMe({ usersDb });
const login = makeLogin({ usersDb });
const logout = makeLogout({ usersDb });
const register = makeRegister({ usersDb });
const resetPassword = makeResetPassword({ usersDb });
const updateDetails = makeUpdateDetails({ usersDb });
const updatePassword = makeUpdatePassword({ usersDb });

const authService = Object.freeze({
  forgotPassword,
  getMe,
  login,
  logout,
  register,
  resetPassword,
  updateDetails,
  updatePassword
});

module.exports = authService;
