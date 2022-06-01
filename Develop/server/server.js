//IMPORT
const express = require('express');
//APPOLO IMPORT
const { ApolloServer } = require('apollo-server-express');
//IMPORT TYPEDEFS AND RESOLVERS
const { typeDefs, resolvers } = require('./schemas');
//IMPORT MIDDELWARE FOR JWT
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

//BELOW ARE NOT FOUND IN WORKING APOLLO SERVER FILE
// const path = require('path');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
//NEW APOLLO SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //ADD CONTEXT AS AUTHMIDDLEWARE FOR JWT
    context: authMiddleware
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//BELOW ARE STATEMENTS UNTESTED-NOT IN THE WORKING APOLLO SERVER FILE NOTE TRUE INSTEAD OF FALSE ABOVE
// app.use(compression());
// app.use(express.urlencoded({ extended: true }));

//NEW INSTANCE OF AN APOLLO SERVER W GRAPHQL CHEMA
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    //MIDDLEWARE
    server.applyMiddleware({ app })
};


//ONE SERVER PROJECTS CAN PUT THEIR DB CONNECTION HERE W/O A CONFIG DIR
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/start-bein";
//SETTING UP MONGOOSE MOD 18 SHORT CIRCUIT 
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/start-bein', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

//THIS IS FROM BUDGET-TRACKER
// app.use(logger("dev"));

// THIS IS IMPORTANT FOR THE CLIENT-SERVER SPLIT if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//THIS MAY HAVE TO BE REMOVED FOR NEW MIDDLEWARE ITS IN GOOGLEBOOKS-NOT DEEP-THOUGHTS
// app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        //TESTING GQL API
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });

});

//LOG MONGO QUERIES EXECUTED-MOVED TO CONFIG CONNECTION - KEEP FOR 1 SERVER
// mongoose.set('debug', true);
//FROM BUDGET-TRACKER REDUNDANT HERE BUT KEEP- MAY BE BETTER FOR 1 SERVER
// app.listen(PORT, () => {
//     console.log(`🌍 Connected on port ${PORT}!`);
// });

//CALL ASYNC TO START THE SERVER
startApolloServer(typeDefs, resolvers);