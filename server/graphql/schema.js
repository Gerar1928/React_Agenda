const { GraphQLSchema } = require('graphql');
const { RootSchema, Mutation } = require('./types.js');

const Schema = new GraphQLSchema({
    query: RootSchema,
    mutation: Mutation
});

module.exports = { Schema }
