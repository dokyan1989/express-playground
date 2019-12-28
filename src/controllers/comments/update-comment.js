const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateComment ({ commentService }) {
  return async function updateComment (httpRequest) {
    const { source = {}, ...commentInfo } = httpRequest.body;
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];
    if (httpRequest.headers.referer) {
      source.referrer = httpRequest.headers.referer;
    }
    const toEdit = {
      ...commentInfo,
      source,
      id: httpRequest.params.id
    };
    const patched = await commentService.updateComment(toEdit);
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(patched.modifiedOn).toUTCString()
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { comment: patched }
      }
    };
  };
};
