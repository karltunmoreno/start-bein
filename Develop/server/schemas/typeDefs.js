const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    startbeins: [Startbein]
    friends: [User]
  }

  type Startbein {
    _id: ID
    startbeinText: String
    createdAt: String
    username: String
    contributeCount: Int
    contributes: [Contribute]
  }

  type Contribute {
    _id: ID
    contributeBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Startbein]
    startbein(_id: ID!): Startbein
  }

  type Mutation {
    login(
      email: String!, 
      password: String!
      ): Auth
    addUser(
      username: String!, 
      email: String!, 
      password: String!
      ): Auth
    addStartbein(
      startbeinText: String!
      ): Startbein
    addContribute(
      startbeinId: ID!, 
      contributeBody: String!
      ): Startbein
    addFriend(
      friendId: ID!
      ): User
  }

  type Auth {
    token: ID!
    user: User
}

`;

module.exports = typeDefs;