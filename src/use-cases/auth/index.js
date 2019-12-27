const makeForgotPassword = require('./forgot-password');
const makeGetMe = require('./get-me');
const makeLogin = require('./login');
const makeRegister = require('./register');
const makeResetPassword = require('./reset-password');
const makeUpdateDetails = require('./update-details');
const makeUpdatePassword = require('./update-password');
const usersDb = require('../../data-access/mongoose/users');

const forgotPassword = makeForgotPassword({ usersDb });
const getMe = makeGetMe({ usersDb });
const login = makeLogin({ usersDb });
const register = makeRegister({ usersDb });
const resetPassword = makeResetPassword({ usersDb });
const updateDetails = makeUpdateDetails({ usersDb });
const updatePassword = makeUpdatePassword({ usersDb });

const authService = Object.freeze({
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword,
  updateDetails,
  updatePassword
});

module.exports = authService;
