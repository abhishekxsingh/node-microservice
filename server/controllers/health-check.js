const { HealthCheck } = require('../services');
const { IDENTITY_SERVICE_URL, VERSION, NAME } = require('../config');

/**
 * Check microservice healtcheck
 * @return {object} status - returns dependent service status.
 * */
const status = async (req, res) => {
  const response = await HealthCheck.status([ IDENTITY_SERVICE_URL ]);

  return res.getRequest({
    dependsOn: response,
    version: `${VERSION}`,
    name: `${NAME}`,
  });
};

module.exports = { status };
