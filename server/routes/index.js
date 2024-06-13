const express = require('express');

const router = express.Router();

const pingRoutes = require('./ping');
const healthCheckRoutes = require('./health-check');
const apiSpecRoutes = require('./api-spec');
const sampleRoutes = require('./sample');

pingRoutes(router);
healthCheckRoutes(router);
apiSpecRoutes(router);
sampleRoutes(router);

module.exports = router;
