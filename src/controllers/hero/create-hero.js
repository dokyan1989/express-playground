module.exports = function makeCreateHero ({ addHero }) {
  return async function createHero (httpRequest) {
    try {
      const { name } = httpRequest.body;
      const posted = await addHero({ name });
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: { posted }
      };
    } catch (e) {
      console.log(e);
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
