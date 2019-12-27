module.exports = function makeExpressCallback (controller) {
  return (req, res, next) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    };

    controller(httpRequest, res)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }

        if (httpResponse.tokenInfo) {
          const { token, options } = httpResponse.tokenInfo;
          res.cookie('token', token, options);
        }

        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(error => next(error));
  };
};
