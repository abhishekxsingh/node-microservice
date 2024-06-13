const path = require('path');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const typesArray = loadFilesSync(path.join(__dirname, './schema'));
const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

const schema = buildSubgraphSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
