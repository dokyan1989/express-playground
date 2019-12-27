const makeUser = require('../../entities/user');

module.exports = function makeRegister ({ usersDb }) {
  return async function register (userData) {
    const user = makeUser(userData);

    let registeredUser = await usersDb.insert({
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      password: user.getPassword(),
      createdAt: user.createdAt(),
      updatedAt: user.getUpdatedAt()
    });
    registeredUser = makeUser({ id: registeredUser._id, ...registeredUser });
    return registeredUser;
  };
};
