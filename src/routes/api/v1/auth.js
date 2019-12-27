const express = require('express');
const router = express.Router();
const makeCallback = require('../../../helpers/express-callback');
const {
  register,
  login,
  logout
} = require('../../../controllers/auth');

router.post('/register', makeCallback(register));
router.post('/login', makeCallback(login));
router.get('/logout', makeCallback(logout));
