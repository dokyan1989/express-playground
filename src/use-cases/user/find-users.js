module.exports = function makeFindUsers ({ usersDb }) {
  return async function findUsers () {
    const users = await usersDb.findAll();
    return users;
  };
};
