const makeAddComment = require('./add-comment');
const makeEditComment = require('./edit-comment');
const makeListComments = require('./list-comments');
const makeRemoveComment = require('./remove-comment');
const makeHandleModeration = require('./handle-moderation');
const commentsDb = require('$app-data-access/mongodb/comments');
const isQuestionable = require('$app-helpers/is-questionable');

const handleModeration = makeHandleModeration({
  isQuestionable,
  initiateReview: async () => {} // TODO: Make real initiate review function.
});

const addComment = makeAddComment({ commentsDb, handleModeration });
const editComment = makeEditComment({ commentsDb, handleModeration });
const listComments = makeListComments({ commentsDb });
const removeComment = makeRemoveComment({ commentsDb });

const commentService = Object.freeze({
  addComment,
  editComment,
  handleModeration,
  listComments,
  removeComment
});

module.exports = commentService;
