const express = require('express');
const router = express.Router();
const { makeHandlerCallback, makeMiddlewareCallback } = require('../../../helpers/express-callback');
const {
  createUser,
  deleteUser,
  updateUser,
  getUsers,
  getUserById
} = require('../../../controllers/user');

const { protect, authorize } = require('../../../middleware/auth');

router.use(makeMiddlewareCallback(protect));
router.use(makeMiddlewareCallback(authorize('admin')));

router.get('/', makeHandlerCallback(getUsers));
router.get('/:id', makeHandlerCallback(getUserById));
router.post('/', makeHandlerCallback(createUser));
router.put('/:id', makeHandlerCallback(updateUser));
router.put('/', makeHandlerCallback(updateUser));
router.delete('/:id', makeHandlerCallback(deleteUser));
router.delete('/', makeHandlerCallback(deleteUser));

module.exports = router;
