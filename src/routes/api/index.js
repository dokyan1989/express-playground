const express = require('express');
const router = express.Router();

router.use('/heroes', require('./heroes'));
router.use('/comments', require('./comments'));

module.exports = router;
