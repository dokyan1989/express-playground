const { ValidationError } = require('../../helpers/error-types');

module.exports = function buildMakeComment ({ Id, md5, sanitize, makeSource }) {
  return function makeComment ({
    author,
    createdOn = Date.now(),
    id = Id.makeId(),
    source,
    modifiedOn = Date.now(),
    postId,
    published = false,
    replyToId,
    text
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new ValidationError('Comment must have a valid id.', 'id');
    }

    if (!author) {
      throw new ValidationError('Comment must have an author.', 'author');
    }

    if (author.length < 2) {
      throw new ValidationError('Comment author\'s name must be longer than 2 characters.', 'author');
    }

    if (!postId) {
      throw new ValidationError('Comment must contain a postId.', 'postId');
    }

    if (!text || text.length < 1) {
      throw new ValidationError('Comment must include at least one character of text.', 'text');
    }

    if (!source) {
      throw new ValidationError('Comment must have a source.', 'source');
    }

    if (replyToId && !Id.isValidId(replyToId)) {
      throw new ValidationError('If supplied. Comment must contain a valid replyToId.', 'replyToId');
    }

    let sanitizedText = sanitize(text).trim();
    if (sanitizedText.length < 1) {
      throw new ValidationError('Comment contains no usable text.', 'text');
    }

    const validSource = makeSource(source);
    const deletedText = '.xX This comment has been deleted Xx.';
    let hash;

    return Object.freeze({
      getAuthor: () => author,
      getCreatedOn: () => createdOn,
      getHash: () => hash || (hash = makeHash()),
      getId: () => id,
      getModifiedOn: () => modifiedOn,
      getPostId: () => postId,
      getReplyToId: () => replyToId,
      getSource: () => validSource,
      getText: () => sanitizedText,
      isDeleted: () => sanitizedText === deletedText,
      isPublished: () => published,
      markDeleted: () => {
        sanitizedText = deletedText;
        author = 'deleted';
      },
      publish: () => {
        published = true;
      },
      unPublish: () => {
        published = false;
      }
    });

    function makeHash () {
      return md5(sanitizedText + published + (author || '') + (postId || '') + (replyToId || ''));
    }
  };
};
