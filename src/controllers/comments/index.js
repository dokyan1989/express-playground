const {
  addComment,
  editComment,
  listComments,
  removeComment
} = require('../../use-cases/comment');
const makeDeleteComment = require('./delete-comment');
const makeGetComments = require('./get-comments');
const makePatchComment = require('./patch-comments');
const makePostComment = require('./post-comment');

const deleteComment = makeDeleteComment({ removeComment });
const getComments = makeGetComments({ listComments });
const postComment = makePostComment({ addComment });
const patchComment = makePatchComment({ editComment });

const commentController = Object.freeze({
  deleteComment,
  getComments,
  postComment,
  patchComment
});

module.exports = commentController;
