const { ValidationError } = require('../../helpers/error-types');

module.exports = function buildMakeSource ({ isValidIp }) {
  return function makeSource ({ ip, browser, referrer } = {}) {
    if (!ip) {
      throw new ValidationError('Comment source must contain an IP.', 'ip');
    }

    if (!isValidIp(ip)) {
      throw new ValidationError('Comment source must contain a valid IP.', 'ip');
    }

    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer
    });
  };
};
