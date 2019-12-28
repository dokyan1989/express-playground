const userService = require('../../use-cases/user');
const makeProtect = require('./protect');

const protect = makeProtect({ userService });

const authMiddleware = Object.freeze({
  protect
});

module.exports = authMiddleware;
