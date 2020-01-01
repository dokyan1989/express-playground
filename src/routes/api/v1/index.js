const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/heroes', require('./heroes'));
router.use('/comments', require('./comments'));
router.use('/users', require('./users'));
router.use('/bootcamps', require('./bootcamps'));
router.use('/courses', require('./courses'));
// router.use('/reviews', require('./reviews'));

module.exports = router;
