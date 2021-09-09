const express = require('express');
const { GraphQLSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const { RootSchema } = require('./graphql/query.js');
const port = 9000;
const app = express();

const Schema = new GraphQLSchema({
    query: RootSchema
});

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

const server = app.listen(port, () => console.log(`Server is running on port ${server.address().port}`));