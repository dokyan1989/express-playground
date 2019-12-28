const { NotAuthorize } = require('../../helpers/error-types');
const ResponseStatus = require('../../constants/ResponseStatus');
const jwt = require('jsonwebtoken');

module.exports = function makeProtect ({ userService }) {
  return async function protect (httpRequest) {
    let token;

    if (httpRequest.headers.authorization &&
        httpRequest.headers.authorization.startsWith('Bearer')) {
      token = httpRequest.headers.authorization.split(' ')[1];
    }
    // Set token from cookie
    // else if (httpRequest.cookies.token) {
    //   token = httpRequest.cookies.token;
    // }

    // Make sure token exists
    if (!token) {
      throw new NotAuthorize();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    httpRequest.user = await userService.findUserById({ id: decoded.id });

    return { status: ResponseStatus.SUCCESS };
  };
};
