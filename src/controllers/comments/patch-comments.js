const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makePatchComment ({ editComment }) {
  return async function patchComment (httpRequest) {
    const { source = {}, ...commentInfo } = httpRequest.body;
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];
    if (httpRequest.headers.Referer) {
      source.referrer = httpRequest.headers.Referer;
    }
    const toEdit = {
      ...commentInfo,
      source,
      id: httpRequest.params.id
    };
    const patched = await editComment(toEdit);
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
