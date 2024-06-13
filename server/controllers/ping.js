const { VERSION, NAME } = require('../config');

/**
 * Check whether microservice is working
 * @return {object} status - returns ok that specifies that microservice is working.
 * */
const status = (req, res) => {
  res.getRequest({
    status: 'ok', version: VERSION, name: NAME,
  });
};

module.exports = { status };
