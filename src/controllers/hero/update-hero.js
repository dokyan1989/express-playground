module.exports = function makeUpdateHero ({ editHero }) {
  return async function updateHero (httpRequest) {
    try {
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
    } catch (e) {
      console.log(e);
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 404,
          body: {
            error: e.message
          }
        };
      }
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
};
