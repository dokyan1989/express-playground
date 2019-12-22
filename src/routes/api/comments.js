const express = require('express');
const router = express.Router();
const makeCallback = require('$app-helpers/express-callback');
const {
  deleteComment,
  getComments,
  postComment,
  patchComment
} = require('$app-controllers/comments');

router.get('/', makeCallback(getComments));
router.post('/', makeCallback(postComment));
router.patch('/:id', makeCallback(patchComment));
router.patch('/', makeCallback(patchComment));
router.delete('/:id', makeCallback(deleteComment));
router.delete('/', makeCallback(deleteComment));

module.exports = router;
