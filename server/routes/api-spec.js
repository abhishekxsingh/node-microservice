const apiDoc = require('../api-spec/microservice-spec.json');

module.exports = (router) => {
  router.get('/api-docs.json', (_, res) => res.getRequest(apiDoc));
};
