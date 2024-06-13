/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/**
 * Initializing the sequelize-cli init command
 * (http://docs.sequelizejs.com/manual/tutorial/migrations.html#bootstrapping)
 * */
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const db = {};

const models = (sequelize, Sequelize) => {
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize);

      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  return db;
};

module.exports = models;
