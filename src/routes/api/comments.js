const express = require('express');
const router = express.Router();
const makeCallback = require('../../helpers/express-callback');
const {
  deleteComment,
  getComments,
  postComment,
  patchComment
} = require('../../controllers/comments');

router.get('/', makeCallback(getComments));
router.post('/', makeCallback(postComment));
router.patch('/:id', makeCallback(patchComment));
router.delete('/:id', makeCallback(deleteComment));

module.exports = router;
