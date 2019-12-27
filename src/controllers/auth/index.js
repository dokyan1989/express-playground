const authService = require('../../use-cases/auth');
const makeRegister = require('./register');
const register = makeRegister({ authService });

const authController = Object.freeze({
  register
});

module.exports = authController;
