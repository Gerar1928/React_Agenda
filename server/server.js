require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const { graphqlHTTP  } = require('express-graphql');
const port = 9000;
const app = express();

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "react-agenda-4d28f",
        "private_key_id": `${process.env.PRIVATE_KEY_ID}`,
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZbMiF2IU5TB0v\nXbC0ZynYKrPQvVw9dD3UjjVbbP2oqILuravE25Bpp/2lXbNlo6e9C20beJxq+qOA\nreRTt0GkrDpptX+LJfYDlvMASRJUHrYYNpmwvb4wJjgkIC7lLZKDwUU68NaMF99p\n7tPs+/nvmPt9aq/MzUa9oVdO4zHwucjDg0pbloUplT8uTVgQuKMR/gGn+R0taxEp\nhs+kZO/6R7r4IvrGF1xYIdOLWmcNWsaFTLyl8k9M+57xgyj+LuTxsFP5eO8y265m\neLTTPj9fjFNhUgCTNapZ/YOvRuuzj5WcvOCzstpagjvCLjMZUJfyGYYFLmCNY3n3\nhPqQKuh7AgMBAAECggEAE+yzseYnjwRaee9B5nvLTF5nUcF1vClfaj45obDq1D9m\nGZcGSp91BrOhVhtwE9AIFZ3pQnsMXTxFhY2PrGuNI9SWFWpTsP9yDo9I6Y2Tysbe\nQRC+LtzFWT1tZwui63Jap6+uzPO/+RuUkQ5KCWnD0KDecDAtunwiJrhQPVd2Adv7\nIwpJ1bpcfPASUD15T9m3ZCTqLwDFZiAc01BRX74Py7BvtQIpczv7JS+xGIZ9FkM9\nB2W9JIp+BgwIJNx+AG01ZgvGKPt05/SwbVh9bcuGcgnA27Pu4vzYJm10OR2Qiw97\nX77iocOzeIWkKGfE4Kk+8paF8b2XVXov9bOJ0mE16QKBgQDUsjKbW9YWe8hYGP61\nb1P8s+T5PHLUfjpUaFevOWfo8Iwb2SmaZ8eTy0bB+QiSz/CKLwA20hxqbJoU3/+2\nohSaD5e1Bs1LAPzHAw96vvsMYQlX0CTyZLh45TeuBPpPNyCT7WYFLlzNweJFVp/A\ntPo+8mX4WI2CUeRlWbFBKu8bTwKBgQC4qVmuToWfN4tLHZ2D4Vb07/hq7ihlaaIL\nm7Oh/sg5IGfACzdijV8zzk/bF6vOYczqSxYnfgB38fmzq6XUsIcAlMIy0n9t1IS/\nFPAqs0pCradw81v14WASpbkIFxH/hDknEOB00AL29n9G0bS6gf2/XJmzJPzBoB/H\nKsqBHuDlFQKBgDbnLMMHqLKzDxsWkKEa9K4VbbScUvPhBYOGT6QOiHELrs79dozB\n3zWaUlB9zSXAgVHaIg8Em4spL3jV/XcSTYkbH0j+UX3b6mQguR0xMTKX1caSFwdu\n0mN6n63O4SITk9g7fos11YTTWGoXmzMuRC59ea7qhNSv+OnkhinRQFlnAoGAXmim\nowkeI7KgEn1HpL82V+/AD9tG5+JDqK+n/TBnaV157aNOY6Jng/L8vMSzX8Z8n2RY\nJUS0NJ6PzR36oGzH+LIVPyqDX8GBRLgNuacEVma17nddEq5xEdeMa+hvmTUeiyyD\ntPUMLvsDQ0+/mIMRGh7brc1BNDULSiZEdhM1Y6kCgYA5Ofp6k2k+rT+PjPtIYDUu\n0yyVW45pJBZUc4+ToT/s4Wn+3S6SPHyJcSJ6rrWktruRKs+5vm5FYGlx69QazN5Y\nPEylbZGLC/QKit1x2AjWRwsbzwCJeyDc21wXRcgd1vCpPXxx/Jxnq1ewJSpLfAe0\nf9e1GWx1UhhufesA6UCOSw==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-8lm7f@react-agenda-4d28f.iam.gserviceaccount.com",
        "client_id": `${process.env.CLIENT_ID}`,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8lm7f%40react-agenda-4d28f.iam.gserviceaccount.com"
    })
});

const db = admin.firestore();

const getSnapshopts = async () => {
    const snapshot = await db.collection('Events').get()

    snapshot.forEach(doc => console.log(new Date(new Date().getTime() - doc.data().Timestamp._seconds)));
}

getSnapshopts();

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
            type: GraphQLString
        },
        Description: {
            type: GraphQLString
        }
    })
})

const RootSchema = new GraphQLObjectType({
    name: 'RootSchema',
    description: 'RootSchema to store events',
    fields: () => ({
        Event: {
            type: new GraphQLList(AgendaEvent),
            resolve: () => ({

            })
        }
    })
});

const Schema = new GraphQLSchema({
    query: RootSchema
});

// app.use('/graphql', graphqlHTTP({
//     schema: Schema,
//     graphiql: true
// }));

const server = app.listen(port, () => console.log(`Server is running on port ${server.address().port}`));