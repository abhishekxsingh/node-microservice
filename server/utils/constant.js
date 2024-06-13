/* eslint-disable max-lines */
module.exports = {
  // Limit is 2 hrs. will block the IP for two hrs.
  API_RATE_LIMIT: { outerLimit: 5, outerTimeLimit: 2 * 60 * 60 * 1000, innerLimit: 10 },
  //
};
