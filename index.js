const { ApolloServer, gql } = require('apollo-server');

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
    user(id: ID!): User
    users: [User]
  }

  type User {
    id: ID!
    name: String
    email: String
  }
`;

// Mock data for the example
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    user: (parent, args, context, info) => {
      return users.find((user) => user.id === args.id);
    },
    users: () => users,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});