const ResponseStatus = require('../../constants/ResponseStatus');

module.exports = function makeForgotPassword ({ authService }) {
  return async function forgotPassword (httpRequest) {
    const email = httpRequest.body.email;
    await authService.forgotPassword({ email, httpRequest });

    return {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 200,
      body: {
        status: ResponseStatus.SUCCESS,
        data: { message: 'Email sent' }
      }
    };
  };
};
