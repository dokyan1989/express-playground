const userService = require('../../use-cases/user');
const makeProtect = require('./protect');
const makeAuthorize = require('./authorize');

const protect = makeProtect({ userService });
const authorize = makeAuthorize({ userService });

const authMiddleware = Object.freeze({
  protect,
  authorize
});

module.exports = authMiddleware;
