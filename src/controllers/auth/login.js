module.exports = function makeLogin ({ authService, makeTokenResponse }) {
  return async function login (httpRequest) {
    const { email, password } = httpRequest.body;
    const user = await authService.login({ email, password });
    return makeTokenResponse(user, 200);
  };
};
