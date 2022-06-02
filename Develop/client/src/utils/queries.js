import { gql } from '@apollo/client';

export const QUERY_STARTBEINS = gql`
  query startbeins($username: String) {
    startbeins(username: $username) {
      _id
      startbeinText
      createdAt
      username
      contributeCount
      contributes {
        _id
        createdAt
        username
        contributeBody
      }
    }
  }
`;

export const QUERY_startbein = gql`
  query startbein($id: ID!) {
    startbein(_id: $id) {
      _id
      startbeinText
      createdAt
      username
      contributeCount
      contributes {
        _id
        createdAt
        username
        contributeBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      startbeins {
        _id
        startbeinText
        createdAt
        contributeCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      startbeins {
        _id
        startbeinText
        createdAt
        contributeCount
        contributes {
          _id
          createdAt
          contributeBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
