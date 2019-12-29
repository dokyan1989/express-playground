const makeUser = require('../../entities/user');
const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeUpdatePassword ({ usersDb }) {
  return async function updatePassword ({ id, currentPassword, newPassword }) {
    // Validate currentPassword
    if (!currentPassword) {
      throw new ValidationError('Please provide a currentPassword', 'currentPassword');
    }

    // Validate newPassword
    if (!newPassword) {
      throw new ValidationError('Please provide a newPassword', 'newPassword');
    }

    // Check for user
    let user = await usersDb.findById({
      id,
      selectFields: ['+password']
    });
    if (!user) {
      throw new NotFoundError('Invalid credentials', 'message');
    }

    user = makeUser({ id: user._id, ...user });

    // Check if password matches
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      throw new ValidationError('Password does not match', 'password');
    }

    const updatedUser = await usersDb.update({
      id,
      password: newPassword,
      updatedAt: Date.now()
    });

    user = makeUser({ id: updatedUser._id, ...updatedUser });
    return user;
  };
};
