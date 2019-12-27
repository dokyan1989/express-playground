const makeUser = require('../../entities/user');
const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeLogin ({ usersDb }) {
  return async function login ({ email, password }) {
    // Validate email & password
    if (!email) {
      return new ValidationError('Please provide an email', 'email');
    }

    if (!password) {
      return new ValidationError('Please provide a password', 'password');
    }

    // Check for user
    let user = await usersDb.findOne({ email }, ['+password']);
    if (!user) {
      return new NotFoundError('Invalid credentials', 'message');
    }

    user = makeUser({ id: user._id, ...user });

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return new ValidationError('Password does not match', 'password');
    }

    return user;
  };
};
