const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const GraphQLUuid = require('graphql-type-uuid');
const GraphQLEmail = require('graphql-type-email');

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  UUID: GraphQLUuid,
  Email: GraphQLEmail,
};

module.exports = resolvers;
