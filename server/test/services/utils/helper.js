const { expect } = require('chai');

const Helper = require('../../../utils/helper');

const dataSnakeCase = { first_name: 'abc', last_name: 'xyz' };
const dataCamelCase = { firstName: 'abc', lastName: 'xyz' };

describe('Helper Module', () => {
  describe('convertCamelToSnake method', () => {
    it('should exists inside Helper Module', () => {
      expect(Helper.convertCamelToSnake).to.be.exist;
    });

    it('should return object having keys in snake case', () => {
      const convertedObj = Helper.convertCamelToSnake(dataCamelCase);

      expect(convertedObj).to.deep.equal(dataSnakeCase);
    });
  });

  describe('convertSnakeObjectToCamel method', () => {
    it('should exists inside Helper Module', () => {
      expect(Helper.convertSnakeToCamel).to.be.exist;
    });

    it('should return object having keys in camelCase', () => {
      const convertedObj = Helper.convertSnakeToCamel(dataSnakeCase);

      expect(convertedObj).to.deep.equal(dataCamelCase);
    });
  });

  describe('sanitizeStr method', () => {
    it('should exists inside the validation Module', () => {
      expect(Helper.sanitizeStr).to.be.exist;
    });

    it('should validate the form request data', () => {
      const response = Helper.sanitizeStr(/[#'"/\\]/g, 'hello #"world"', '');

      expect(response).to.deep.equal('hello world');
    });
  });

  describe('postRequest method', () => {
    it('should exists inside the helper Module', () => {
      expect(Helper.postRequest).to.be.exist;
    });
  });

  describe('getRequest method', () => {
    it('should exists inside the helper Module', () => {
      expect(Helper.getRequest).to.be.exist;
    });
  });

  describe('generateRandomPassword method', () => {
    it('should exists inside the helper Module', () => {
      expect(Helper.generateRandomPassword).to.be.exist;
    });

    it('should return ramdon 6 digit string', () => {
      const response = Helper.generateRandomPassword();

      expect(response.length).to.deep.equal(6);
    });
  });
});
