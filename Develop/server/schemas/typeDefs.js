//IMPORT GQL FUNCTION
const { gql } = require('apollo-server-express');

//CREATE
const typeDefs = gql`

    type Contribute {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
    }

    type Reaction {
      _id: ID
      reactionBody: String
      createdAt: String
      username: String
    }

    type Query {
      contributes: [Contribute]
    }

`;



//EXPORT TYPEDEFS
module.exports = typeDefs;