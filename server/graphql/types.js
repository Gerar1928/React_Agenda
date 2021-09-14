const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const { db } = require('../firebase.js');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
});

const AgendaEvent = new GraphQLObjectType({
    name: 'Events',
    description: 'List of current month events',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        timestamp: {
            type: new GraphQLList(Timestamp)
        },
        description: {
            type: GraphQLString
        }
    })
});

const RootSchema = new GraphQLObjectType({
    name: 'RootSchema',
    description: 'RootSchema to store events',
    fields: () => ({
        event: {
            type: new GraphQLList(AgendaEvent),
            resolve: async () => {
                const snapshot = await db.collection('Events').get();
                const events = [];
                snapshot.forEach(doc => {
                    const date = new Date(doc.data().Timestamp.toDate());
                    const event = {
                        id: doc.id,
                        name: doc.data().Name,
                        timestamp: [{
                            date: date.getDate(),
                            day: days[date.getDay()],
                            month: months[date.getMonth()],
                            year: date.getFullYear()
                        }],
                        description: doc.data().Description
                    }

                    events.push(event);
                });

                return events;
            }
        }
    })
});

module.exports = { RootSchema }