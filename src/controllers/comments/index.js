const commentService = require('../../use-cases/comment');
const makeDeleteComment = require('./delete-comment');
const makeGetComments = require('./get-comments');
const makeUpdateComment = require('./update-comment');
const makeCreateComment = require('./create-comment');

const deleteComment = makeDeleteComment({ commentService });
const getComments = makeGetComments({ commentService });
const createComment = makeCreateComment({ commentService });
const updateComment = makeUpdateComment({ commentService });

const commentController = Object.freeze({
  deleteComment,
  getComments,
  createComment,
  updateComment
});

module.exports = commentController;
