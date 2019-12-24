module.exports = function buildMakeUser () {
  return function makeUser ({
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
      getName: () => name,
      getEmail: () => email,
      getRole: () => role,
      getPassword: () => password,
      getResetPasswordToken: () => resetPasswordToken,
      getResetPasswordExpire: () => resetPasswordExpire,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
    });
  };
};
