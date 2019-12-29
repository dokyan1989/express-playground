module.exports = function makeHandlerCallback (controller) {
  return (req, res, next) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      protocol: req.protocol,
      headers: {
        'Content-Type': req.get('Content-Type'),
        'User-Agent': req.get('User-Agent'),
        referer: req.get('Referer'),
        authorization: req.get('Authorization'),
        host: req.get('host')
      }
    };

    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }

        if (httpResponse.cookies && httpResponse.cookies.length > 0) {
          httpResponse.cookies.forEach(cookie => {
            const { name, value, options } = cookie;
            res.cookie(name, value, options);
          });
        }

        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(error => next(error));
  };
};
