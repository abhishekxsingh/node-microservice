const { save } = require('../controllers/sample');

module.exports = (router) => {
  router.get('/test/save', save);
};
