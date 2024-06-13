const { Sample } = require('../services');

/**
 * Check microservice healtcheck
 * @return {object} status - returns dependent service status.
 * */
const save = async (req, res) => {
  await Sample.save();

  return res.getRequest();
};

module.exports = { save };
