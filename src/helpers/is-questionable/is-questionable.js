module.exports = function makeIsQuestionable({
  pipe,
  issueHttpRequest,
  querystring
}) {
  return async function isQuestionable({
    author,
    browser,
    createdOn,
    ip,
    modifiedOn,
    referrer,
    testOnly,
    text
  } = {}) {
    const callModerationApi = pipe(
      buildModerationApiCommand,
      issueHttpRequest,
      normalizeModerationApiResponse
    );

    const callSpamApi = pipe(
      buildAkismetApiCommand,
      issueHttpRequest,
      normalizeAkismetApiResponse
    );

    try {
      const [inappropriate, spam] = await Promise.all([
        callModerationApi(text),
        callSpamApi({
          author,
          browser,
          createdOn,
          ip,
          modifiedOn,
          querystring,
          referrer,
          testOnly,
          text
        })
      ]);
      return inappropriate || spam;
    } catch (e) {
      console.log(e);
      return true;
    }
  }
}