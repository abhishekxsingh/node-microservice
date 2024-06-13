const axios = require('axios');
const database = require('../database');
const { DATABASE: { name: databaseName } } = require('../config');

const { SequelizeMeta } = database;

const checkMicroServiceStatus = async (url) => {
  try {
    const { data: { version, name } } = await axios(`${url}/ping`);

    return ({
      url,
      name,
      status: 'success',
      type: 'service',
      version: version || null,
    });
  } catch (error) {
    return ({
      url,
      name: url,
      status: 'failure',
      type: 'service',
    });
  }
};

const getDatabaseDetails = async () => {
  let version = null;

  try {
    await database.authenticate();

    const data = await SequelizeMeta.findOne({
      attributes: [ 'name' ],
      order: [ [ 'name', 'DESC' ] ],
    });

    if (data) {
      const { dataValues: { name } } = data;

      version = name;
    }

    return ({
      name: databaseName,
      status: 'success',
      type: 'database',
      version,
    });
  } catch (error) {
    return ({
      name: databaseName,
      status: 'failure',
      type: 'database',
      version,
    });
  }
};

const status = async (urls = []) => {
  const response = await Promise.all(urls.map(async (url) => {
    const result = await checkMicroServiceStatus(`${url}`);

    return result;
  }));

  const checkDbConnection = await getDatabaseDetails();

  response.push(checkDbConnection);

  return response;
};

module.exports = { status, getDatabaseDetails, checkMicroServiceStatus };
