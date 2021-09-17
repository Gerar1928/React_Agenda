const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const { admin, db } = require('../firebase.js');

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
    name: 'Root',
    fields: () => ({
        event: {
            type: new GraphQLList(AgendaEvent),
            args: {
                month: {
                    type: GraphQLString
                }
            },
            resolve: async (parent, args) => {
                const events = [];
                try {
                    const snapshot = await db.collection('Events').get();
                    snapshot.forEach(doc => {
                        const date = new Date(doc.data().timestamp.toDate());
                        const event = {
                            id: doc.id,
                            name: doc.data().name,
                            timestamp: [{
                                date: date.getDate(),
                                day: days[date.getDay()],
                                month: months[date.getMonth()],
                                year: date.getFullYear()
                            }],
                            description: doc.data().description
                        }

                        if (event.timestamp[0].month === args.month) {
                            events.push(event);
                        }
                    });
    
                    return events;
                } catch (err) {
                    return events;
                }
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        add_event: {
            type: new GraphQLList(AgendaEvent),
            args: {
                name: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                date: {
                    type: GraphQLInt
                },
                month: {
                    type: GraphQLInt
                },
                year: {
                    type: GraphQLInt
                }
            },
            resolve: async (parent, args) => {
                try {
                    await db.collection('Events').add({
                        name: args.name,
                        timestamp: admin.firestore.Timestamp.fromDate(new Date(args.year, args.month, args.date)),
                        description: args.description
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        },
        remove_event: {
            type: new GraphQLList(AgendaEvent),
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: async (parent, args) => {
                try {
                    await db.collection('Events').doc(args.id).delete();
                } catch (err) {
                    console.log(err)
                }
            }
        }
    })
});

module.exports = { RootSchema, Mutation }