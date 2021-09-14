const { GraphQLSchema } = require('graphql');
const { RootSchema } = require('./types.js');

const Schema = new GraphQLSchema({
    query: RootSchema
});

module.exports = { Schema }
