const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
const server = require('../../../server');

const { Sample: SampleService } = require('../../../../services');
const { AUTHORIZATION } = require('../../../constant');

const { expect } = chai;

chai.use(chaiHttp);

describe('Get graphql', () => {
  let mockSampleService;

  context('get reslover', () => {
    let statusRes;

    let bodyRes;

    before(async () => {
      mockSampleService = sinon.stub(SampleService, 'get');
      mockSampleService.returns({
        doc: { title: 'sample-title', author: 'sample-author' },
      });

      const { status, body } = await chai.request(server)
        .post('/graphql')
        .set('authorization', AUTHORIZATION)
        .send({
          query: `query{
            Book{
              data{
                title
                author
              }
            }
          }`,
        });

      statusRes = status;
      bodyRes = body;
    });

    afterEach(async () => {
      mockSampleService.restore();
    });

    it('should return a successfully created status when doing the save i.e. HTTP 200', () => {
      expect(statusRes).to.equal(200);
    });

    it('should return a response body to be an object', () => {
      const { data: { Book: { data } } } = bodyRes;

      expect(data).to.be.an('object');
    });
  });
});
