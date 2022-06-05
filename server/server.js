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
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
startServer()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//BELOW ARE STATEMENTS UNTESTED-NOT IN THE WORKING APOLLO SERVER FILE NOTE TRUE INSTEAD OF FALSE ABOVE
// app.use(compression());
// app.use(express.urlencoded({ extended: true }));
// THIS IS IMPORTANT FOR THE CLIENT-SERVER SPLIT if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//NEW INSTANCE OF AN APOLLO SERVER W GRAPHQL SCHEMA-UPDATED ABOVE
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //MIDDLEWARE
  server.applyMiddleware({ app });
};
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
