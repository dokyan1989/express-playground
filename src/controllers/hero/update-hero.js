module.exports = function makeUpdateHero ({ editHero }) {
  return async function updateHero (httpRequest) {
    const { name } = httpRequest.body;
    const toEdit = {
      name,
      id: httpRequest.params.id
    };
    const updated = await editHero(toEdit);
    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: { updated }
    };
  };
};
