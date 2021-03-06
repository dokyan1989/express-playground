const makeUser = require('../../entities/user');
const { ValidationError, NotFoundError } = require('../../helpers/error-types');

module.exports = function makeLogin ({ usersDb }) {
  return async function login ({ email, password }) {
    // Validate email
    if (!email) {
      throw new ValidationError('Please provide an email', 'email');
    }

    // Validate password
    if (!password) {
      throw new ValidationError('Please provide a password', 'password');
    }

    // Check for user
    let user = await usersDb.findOne({
      condition: { email },
      selectFields: ['+password']
    });
    if (!user) {
      throw new NotFoundError('Invalid credentials');
    }

    user = makeUser({ id: user._id, ...user });

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new ValidationError('Password does not match', 'password');
    }

    return user;
  };
};
