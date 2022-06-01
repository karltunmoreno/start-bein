//IMPORT GQL FUNCTION
const { gql } = require('apollo-server-express');

//CREATE
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
    users: [User]
    user(username: String!): User
    startbeins(username: String): [Startbein]
    startbein(_id: ID!): Startbein
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
}

`;



//EXPORT TYPEDEFS
module.exports = typeDefs;