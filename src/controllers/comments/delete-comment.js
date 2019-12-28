const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteComment ({ commentService }) {
  return async function deleteComment (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const deleted = await commentService.deleteComment({ id: httpRequest.params.id });
    return {
      headers,
      statusCode: deleted.deletedCount === 0 ? 404 : 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: deleted
      }
    };
  };
};
