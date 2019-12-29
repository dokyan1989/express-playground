const express = require('express');
const router = express.Router();
const { makeHandlerCallback, makeMiddlewareCallback } = require('../../../helpers/express-callback');
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword
} = require('../../../controllers/auth');

const { protect } = require('../../../middleware/auth');

router.post('/register', makeHandlerCallback(register));
router.post('/login', makeHandlerCallback(login));
router.get('/logout', makeHandlerCallback(logout));
router.get('/me',
  makeMiddlewareCallback(protect),
  makeHandlerCallback(getMe));
router.put('/update-details',
  makeMiddlewareCallback(protect),
  makeHandlerCallback(updateDetails));
router.put('/update-password',
  makeMiddlewareCallback(protect),
  makeHandlerCallback(updatePassword));
router.post('/forgot-password',
  makeHandlerCallback(forgotPassword));
router.put('/reset-password',
  makeHandlerCallback(resetPassword));
module.exports = router;
