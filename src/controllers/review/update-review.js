const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateReview ({ reviewService }) {
  return async function updateReview (httpRequest) {
    const fieldsToUpdate = Object.assign({}, httpRequest.body);
    Object.keys(fieldsToUpdate).forEach((key) =>
      (fieldsToUpdate[key] === null || fieldsToUpdate[key] === undefined) && delete fieldsToUpdate[key]);
    const review = await reviewService.updateReview({ user: httpRequest.user, id: httpRequest.params.id, ...fieldsToUpdate });
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { review }
      }
    };
  };
};
