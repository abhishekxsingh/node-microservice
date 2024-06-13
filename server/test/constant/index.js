module.exports = {
  AUTHORIZATION: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjdmNmQzZTM2MjA4ZjU5ZGU4ZmI0MmM2M2I4YTgyNzJlIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1MzM1NDc1MjcsImV4cCI6MTUzM',
  CONCURRENCY_STAMP: '9d5c0900-414a-11e8-ae7d-85f11c981ec1',
  CORRELATION_ID: '9d5c0900-414a-11e8-ae7d-85f11c981ec1',
  USER_ID: '9d5c0900-414a-11e8-ae7d-85f11c981ec1',
  LOGIN_DTO_SCHEMA: {
    title: 'Login form',
    description: 'Defines the structure for HTTP POST request body',
    type: 'object',
    properties: {
      userName: {
        anyOf: [
          {
            type: 'string',
            description: 'mobile of user',
            pattern: '^[1-9]{1}[0-9]{9}',
            maxLength: 10,
          },
          {
            type: 'string',
            description: 'email of user',
          },
        ],
      },
      password: {
        type: 'string',
        description: 'Password.',
      },
    },
    minProperties: 2,
    maxProperties: 2,
    errorMessage: {
      required: {
        userName: 'UserName is required in the body.',
        password: 'Password is required in the body.',
      },
      properties: {
        userName: 'UserName should be valid.',
        password: 'Parameter: password should be valid.',
      },
    },
    required: [ 'userName', 'password' ],
    additionalProperties: false,
  },
};
