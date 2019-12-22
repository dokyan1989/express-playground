const crypto = require('crypto');
const Id = require('$app-helpers/Id');
const ipRegex = require('ip-regex');
const sanitizeHtml = require('sanitize-html');
const buildMakeComment = require('./comment');
const buildMakeSource = require('./source');

const makeSource = buildMakeSource({ isValidIp });
const makeComment = buildMakeComment({ Id, md5, sanitize, makeSource });

module.exports = makeComment;

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(ip);
}

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex');
}

function sanitize (text) {
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it']
  });
}
