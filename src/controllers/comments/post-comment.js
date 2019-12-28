const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makePostComment ({ addComment }) {
  return async function postComment (httpRequest) {
    const { source = {}, ...commentInfo } = httpRequest.body;
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];
    if (httpRequest.headers.referer) {
      source.referrer = httpRequest.headers.referer;
    }
    const comment = await addComment({
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
