const makeComment = require('../../entities/comment');

module.exports = function makeCreateComment ({ commentsDb, handleModeration }) {
  return async function createComment (commentInfo) {
    const comment = makeComment(commentInfo);
    const exists = await commentsDb.findByHash({
      hash: comment.getHash()
    });
    if (exists) {
      return exists;
    }

    const moderated = await handleModeration({
      comment
    });
    const commentSource = moderated.getSource();
    const createdComment = await commentsDb.insert({
      author: moderated.getAuthor(),
      createdOn: moderated.getCreatedOn(),
      hash: moderated.getHash(),
      id: moderated.getId(),
      modifiedOn: moderated.getModifiedOn(),
      postId: moderated.getPostId(),
      published: moderated.isPublished(),
      replyToId: moderated.getReplyToId(),
      source: {
        ip: commentSource.getIp(),
        browser: commentSource.getBrowser(),
        referrer: commentSource.getReferrer()
      },
      text: moderated.getText()
    });
    return createdComment;
  };
};
