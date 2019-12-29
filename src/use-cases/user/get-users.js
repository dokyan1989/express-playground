module.exports = function makeGetUsers ({ usersDb }) {
  return async function getUsers () {
    const users = await usersDb.findAll();
    return users;
  };
};
