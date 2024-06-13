const { status } = require('../controllers/health-check');

module.exports = (router) => {
  router.get('/healthcheck', status);
};
