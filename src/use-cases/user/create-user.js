const makeUser = require('../../entities/user');

module.exports = function makeCreateUser ({ usersDb }) {
  return async function createUser (userData) {
    const user = makeUser(userData);

    const createdUser = await usersDb.insert({
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt()
    });

    return createdUser;
  };
};
