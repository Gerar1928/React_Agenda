const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { Schema } = require('./graphql/schema.js');
const port = 9000;
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

const server = app.listen(port, () => console.log(`Server is running on port ${server.address().port}`));