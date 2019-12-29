module.exports = function makeUpdatePassword ({ authService, makeTokenResponse }) {
  return async function updatePassword (httpRequest) {
    const { currentPassword, newPassword } = httpRequest.body;
    const user = await authService.updatePassword({ id: httpRequest.user._id, currentPassword, newPassword });
    return makeTokenResponse(user, 200);
  };
};
