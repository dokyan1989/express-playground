const axios = require('axios');
const querystring = require('querystring');
const pipe = require('@devmastery/pipe');
const makeIsQuestionable = require('./is-questionable');

const isQuestionable = makeIsQuestionable({
  issueHttpRequest: axios,
  pipe,
  querystring
});

export default isQuestionable;
