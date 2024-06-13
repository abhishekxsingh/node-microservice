const { expect } = require('chai');

const { HealthCheck } = require('../../services');

const dbResponse = {
  name: 'node_microservice',
  type: 'database',
  status: 'success',
  version: null,
};

describe('HealthCheck object', () => {
  describe('getDatabaseDetails method', () => {
    it('should exists inside HealthCheck object', () => {
      expect(HealthCheck).to.have.nested.property('getDatabaseDetails');
    });

    it('should return success while connecting with database', async () => {
      const response = await HealthCheck.getDatabaseDetails();

      expect(response).to.deep.equal(dbResponse);
    });
  });

  describe('checkMicroServiceStatus method', () => {
    it('should exists inside HealthCheck object', () => {
      expect(HealthCheck).to.have.nested.property('checkMicroServiceStatus');
    });
  });

  describe('status method', () => {
    it('should exists inside HealthCheck object', () => {
      expect(HealthCheck).to.have.nested.property('status');
    });

    it('should not return empty rsponse', async () => {
      const response = await HealthCheck.status();

      expect(response).to.not.be.empty;
    });

    it('should not return rsponse as an array', async () => {
      const response = await HealthCheck.status();

      expect(response).to.be.an('array');
    });
  });
});
