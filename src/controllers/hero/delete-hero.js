module.exports = function makeDeleteHero ({ removeHero }) {
  return async function deleteHero (httpRequest) {
    const deleted = await removeHero({ id: httpRequest.params.id });
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: deleted.deletedCount === 0 ? 404 : 200,
      body: {
        deleted
      }
    };
  };
};
