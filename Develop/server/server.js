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
const path = require('path');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

//NEW APOLLO SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    //ADD CONTEXT AS AUTHMIDDLEWARE FOR JWT
    context: authMiddleware
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//BELOW ARE STATEMENTS UNTESTED-NOT IN THE WORKING APOLLO SERVER FILE NOTE TRUE INSTEAD OF FALSE ABOVE
// app.use(compression());
// app.use(express.urlencoded({ extended: true }));



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
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }


//THIS MAY HAVE TO BE REMOVED FOR NEW MIDDLEWARE ITS IN GOOGLEBOOKS-NOT DEEP-THOUGHTS
// app.use(routes);

//NEW INSTANCE OF AN APOLLO SERVER W GRAPHQL CHEMA
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    //MIDDLEWARE
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            //TESTING GQL API
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    
    });
};




//LOG MONGO QUERIES EXECUTED-MOVED TO CONFIG CONNECTION - KEEP FOR 1 SERVER
// mongoose.set('debug', true);
//FROM BUDGET-TRACKER REDUNDANT HERE BUT KEEP- MAY BE BETTER FOR 1 SERVER
// app.listen(PORT, () => {
//     console.log(`🌍 Connected on port ${PORT}!`);
// });

//CALL ASYNC TO START THE SERVER
startApolloServer(typeDefs, resolvers);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/budget",
  {
    /** useNewUrlParser false by default. Set to `true` to make all connections set the `useUnifiedTopology` option by default */
    useNewUrlParser: true,
    /** Set use FindAndModify to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

// routes
app.use(require("./routes"));

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://ChristiLewis:Wlrdy4pkxWj7dabC@cluster0.ihk9u.mongodb.net/budget?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//LOG MONGO QUERIES EXECUTED
mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`🌍 Connected on port ${PORT}!`);
});
