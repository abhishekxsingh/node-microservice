const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../../server');
const { VERSION } = require('../../config');

const { expect } = chai;

chai.use(chaiHttp);

const request = chai.request(server);

const healthCheckResponse = {
  version: VERSION,
  name: 'node_microservice',
  dependsOn: [
    {
      name: 'node_microservice',
      url: 'https://auth.eazyfin.com',
      type: 'database',
      status: 'success',
      version: null,
    } ],
};

describe('HealthCheck /GET', () => {
  let httpGet;

  before(() => {
    httpGet = sinon.stub(request, 'get');
    httpGet.returns({
      body: healthCheckResponse,
      status: 200,
    });
  });

  after(() => {
    httpGet.restore();
  });

  it('should return response status equals to 200', async () => {
    const { status } = await request.get('/healthcheck');

    expect(status).to.equal(200);
  });

  it('should return response body equals to healthCheckResponse', async () => {
    const { body } = await request.get('/healthcheck');

    expect(body).to.equal(healthCheckResponse);
  });
});
