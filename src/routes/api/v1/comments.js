const express = require('express');
const router = express.Router();
const { makeHandlerCallback } = require('../../../helpers/express-callback');
const {
  deleteComment,
  getComments,
  postComment,
  patchComment
} = require('../../../controllers/comments');

router.get('/', makeHandlerCallback(getComments));
router.post('/', makeHandlerCallback(postComment));
router.patch('/:id', makeHandlerCallback(patchComment));
router.patch('/', makeHandlerCallback(patchComment));
router.delete('/:id', makeHandlerCallback(deleteComment));
router.delete('/', makeHandlerCallback(deleteComment));

module.exports = router;
