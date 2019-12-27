module.exports = function buildMakeUser ({ jwt, bcrypt, crypto }) {
  return function makeUser ({
    id,
    name,
    email,
    role,
    password,
    resetPasswordToken,
    resetPasswordExpire,
    createdAt = Date.now(),
    updatedAt = Date.now()
  } = {}) {
    return Object.freeze({
      getId: () => id,
      getName: () => name,
      getEmail: () => email,
      getRole: () => role,
      getPassword: () => password,
      getResetPasswordToken: () => resetPasswordToken,
      getResetPasswordExpire: () => resetPasswordExpire,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getSignedJwtToken,
      matchPassword,
      generateResetPasswordToken
    });

    // Sign JWT and return
    function getSignedJwtToken () {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      });
    }

    // Match user entered password to hashed password in database
    async function matchPassword (enteredPassword) {
      const isMatched = await bcrypt.compare(enteredPassword, password);
      return isMatched;
    }

    // Generate and hash password token
    function generateResetPasswordToken () {
      // Generate token
      const resetToken = crypto.randomBytes(20).toString('hex');

      // Hash token and set to resetPasswordToken field
      resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      // Set expire
      resetPasswordExpire = Date.now() + 10 * 60 * 1000;

      return resetToken;
    };
  };
};
