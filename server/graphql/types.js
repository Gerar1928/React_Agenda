const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');

const Timestamp = new GraphQLObjectType({
    name: 'Timestamp',
    fields: () => ({
        date: {
            type: GraphQLInt
        },
        day: {
            type: GraphQLString
        },
        month: {
            type: GraphQLString
        },
        year: {
            type: GraphQLInt
        }
    })
})

const AgendaEvent = new GraphQLObjectType({
    name: 'Events',
    description: 'List of current month events',
    fields: () => ({
        Id: {
            type: GraphQLString
        },
        Name: {
            type: GraphQLString
        },
        Timestamp: {
            type: new GraphQLList(Timestamp)
        },
        Description: {
            type: GraphQLString
        }
    })
});

module.exports = { AgendaEvent }