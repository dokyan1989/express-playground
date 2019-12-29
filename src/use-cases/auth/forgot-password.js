const { NotFoundError } = require('../../helpers/error-types');
const makeUser = require('../../entities/user');
const sendEmail = require('../../helpers/sendEmail');

module.exports = function makeForgotPassword ({ usersDb }) {
  return async function forgotPassword ({ email, httpRequest }) {
    let user = await usersDb.findOne({
      condition: { email }
    });

    if (!user) {
      throw new NotFoundError('There is no user with that email', 'email');
    }

    user = makeUser({ id: user._id, ...user });

    // Get reset token
    const resetToken = user.generateResetPasswordToken();
    await usersDb.update({
      id: user.getId(),
      resetPasswordToken: user.getResetPasswordToken(),
      resetPasswordExpire: user.getResetPasswordExpire()
    });

    // Create reset url
    const resetUrl = `${httpRequest.protocol}://${httpRequest.headers.host}/api/v1/auth/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.getEmail(),
        subject: 'Password reset token',
        message
      });
    } catch (err) {
      console.log(err);
      await usersDb.update({
        id: user.getId(),
        resetPasswordToken: undefined,
        resetPasswordExpire: undefined
      });
      throw new Error('Email could not be sent');
    }
  };
};
