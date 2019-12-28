const express = require('express');
const router = express.Router();
const { makeHandlerCallback, makeMiddlewareCallback } = require('../../../helpers/express-callback');
const {
  register,
  login,
  logout,
  getMe
} = require('../../../controllers/auth');

const { protect } = require('../../../middleware/auth');

router.post('/register', makeHandlerCallback(register));
router.post('/login', makeHandlerCallback(login));
router.get('/logout', makeHandlerCallback(logout));
router.get('/me',
  makeMiddlewareCallback(protect),
  makeHandlerCallback(getMe));
module.exports = router;
