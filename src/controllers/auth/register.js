module.exports = function makeRegister ({ authService, makeTokenResponse }) {
  return async function register (httpRequest) {
    const { ...userData } = httpRequest.body;
    const user = await authService.register(userData);
    return makeTokenResponse(user, 200);
  };
};
