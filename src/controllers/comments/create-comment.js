const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeCreateComment ({ commentService }) {
  return async function createComment (httpRequest) {
    const { source = {}, ...commentInfo } = httpRequest.body;
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];
    if (httpRequest.headers.referer) {
      source.referrer = httpRequest.headers.referer;
    }
    const comment = await commentService.createComment({
      ...commentInfo,
      source
    });
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(comment.modifiedOn).toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { comment }
      }
    };
  };
};
