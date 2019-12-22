const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeUpdateHero ({ editHero }) {
  return async function updateHero (httpRequest) {
    const { name } = httpRequest.body;
    const toEdit = {
      name,
      id: httpRequest.params.id
    };
    const hero = await editHero(toEdit);
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { hero }
      }
    };
  };
};
