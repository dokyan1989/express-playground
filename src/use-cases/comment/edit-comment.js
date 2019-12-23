const makeComment = require('$app-entities/comment');
const { ValidationError, NotFoundError } = require('$app-helpers/error-types');

module.exports = function makeEditComment ({ commentsDb, handleModeration }) {
  return async function editComment ({ id, ...changes } = {}) {
    if (!id) {
      throw new ValidationError('You must supply an id.', 'id');
    }

    if (!changes.text) {
      throw new ValidationError('You must supply text.', 'text');
    }

    const existing = await commentsDb.findById({ id });
    if (!existing) {
      throw new NotFoundError('Comment not found.', 'comment');
    }

    const comment = makeComment({ ...existing, ...changes, modifiedOn: undefined });
    if (comment.getHash() === existing.hash) {
      console.log(comment);
      return existing;
    }
    const moderated = await handleModeration({ comment });
    const updated = await commentsDb.update({
      id: moderated.getId(),
      published: moderated.isPublished(),
      modifiedOn: moderated.getModifiedOn(),
      text: moderated.getText(),
      hash: moderated.getHash()
    });
    return { ...existing, ...updated };
  };
};
