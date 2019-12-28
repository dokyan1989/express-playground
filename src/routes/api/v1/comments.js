const express = require('express');
const router = express.Router();
const { makeHandlerCallback } = require('../../../helpers/express-callback');
const {
  deleteComment,
  getComments,
  createComment,
  updateComment
} = require('../../../controllers/comments');

router.get('/', makeHandlerCallback(getComments));
router.post('/', makeHandlerCallback(createComment));
router.put('/:id', makeHandlerCallback(updateComment));
router.put('/', makeHandlerCallback(updateComment));
router.delete('/:id', makeHandlerCallback(deleteComment));
router.delete('/', makeHandlerCallback(deleteComment));

module.exports = router;
