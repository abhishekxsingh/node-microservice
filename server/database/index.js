/* eslint-disable no-fallthrough */
const Sequelize = require('sequelize');

const {
  DATABASE: {
    name,
    username,
    password,
    options,
  },
} = require('../config');

const models = require('./models');

let database = {};

const sequelize = new Sequelize(name, username, password, { ...options });

database = models(sequelize, Sequelize);

database.Sequelize = Sequelize;

database.authenticate = () => sequelize.authenticate();

module.exports = database;
