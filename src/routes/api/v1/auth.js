const express = require('express');
const router = express.Router();
const makeCallback = require('../../../helpers/express-callback');
const {
  register,
  login
} = require('../../../controllers/auth');

router.post('/register', makeCallback(register));
router.post('/login', makeCallback(login));
