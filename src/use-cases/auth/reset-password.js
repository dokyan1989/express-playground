const makeUser = require('../../entities/user');
const { NotFoundError } = require('../../helpers/error-types');

module.exports = function makeResetPassword ({ usersDb }) {
  return async function resetPassword ({ resetPasswordToken, password }) {
    const foundUser = await usersDb.findOne({
      condition: {
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      }
    });
    if (!foundUser) {
      throw new NotFoundError('User not found. Invalid token.');
    }

    let updatedUser = await usersDb.update({
      id: foundUser._id,
      password,
      resetPasswordToken: undefined,
      resetPasswordExpire: undefined
    });

    updatedUser = makeUser({ id: updatedUser._id, ...updatedUser });
    return updatedUser;
  };
};
