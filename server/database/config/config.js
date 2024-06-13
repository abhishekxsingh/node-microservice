const {
  DATABASE: {
    name: database, username, password, options: { host, dialect, port },
  },
} = require('../../config');

module.exports = {
  username,
  password,
  database,
  host,
  dialect,
  port,
};
