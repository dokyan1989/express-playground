const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/heroes', require('./heroes'));
router.use('/comments', require('./comments'));

module.exports = router;