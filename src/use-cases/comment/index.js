const makeCreateComment = require('./create-comment');
const makeUpdateComment = require('./update-comment');
const makeGetComments = require('./get-comments');
const makeDeleteComment = require('./delete-comment');
const makeHandleModeration = require('./handle-moderation');
const commentsDb = require('../../data-access/mongodb/comments');
const isQuestionable = require('../../helpers/is-questionable');

const handleModeration = makeHandleModeration({
  isQuestionable,
  initiateReview: async () => {} // TODO: Make real initiate review function.
});

const createComment = makeCreateComment({ commentsDb, handleModeration });
const updateComment = makeUpdateComment({ commentsDb, handleModeration });
const getComments = makeGetComments({ commentsDb });
const deleteComment = makeDeleteComment({ commentsDb });

const commentService = Object.freeze({
  createComment,
  updateComment,
  handleModeration,
  getComments,
  deleteComment
});

module.exports = commentService;
