const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeDeleteComment ({ removeComment }) {
  return async function deleteComment (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const deleted = await removeComment({ id: httpRequest.params.id });
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
