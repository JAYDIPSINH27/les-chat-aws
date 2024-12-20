const { ApolloServer } = require('apollo-server');
const connectToDB = require('./db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { PORT } = require('./utils/config');
require('dotenv').config();
connectToDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => context,
  cors: {
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS'], 
    credentials: true,
  },
});

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
