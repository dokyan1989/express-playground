const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeGetComments ({ commentService }) {
  return async function getComments (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    const postComments = await commentService.getComments({
      postId: httpRequest.query.postId
    });
    return {
      headers,
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { comments: postComments }
      }
    };
  };
};
