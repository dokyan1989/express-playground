const { ValidationError } = require('../../helpers/error-types');

module.exports = function makeGetComments ({ commentsDb }) {
  return async function getComments ({ postId } = {}) {
    if (!postId) {
      throw new ValidationError('You must supply a post id.', 'postId');
    }
    const comments = await commentsDb.findByPostId({
      postId,
      omitReplies: false
    });
    const nestedComments = nest(comments);
    return nestedComments;

    // If this gets slow introduce caching
    function nest (comments) {
      if (comments.length === 0) {
        return comments;
      }
      return comments.reduce((nested, comment) => {
        comment.replies = comments.filter(
          reply => reply.replyToId === comment.id
        );
        nest(comment.replies);
        if (comment.replyToId === null) {
          nested.push(comment);
        }
        return nested;
      }, []);
    };
  };
};
