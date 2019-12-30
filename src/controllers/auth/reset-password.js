module.exports = function makeResetPassword ({ authService, makeTokenResponse, crypto }) {
  return async function resetPassword (httpRequest) {
    // Get hased token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(httpRequest.params.resetToken)
      .digest('hex');

    const user = await authService.resetPassword({ resetPasswordToken, password: httpRequest.body.password });
    return makeTokenResponse(user, 200);
  };
};
