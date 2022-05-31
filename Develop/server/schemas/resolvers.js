//IMPORT
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Startbein, Contribute } = require('../models');

const resolvers = {
    Query: {
        //ALL
        startbeins: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Startbein.find(params).sort({ createdAt: -1 });
        },
        //ONE BY ID
        startbein: async (parent, { _id }) => {
            return Startbein.findOne({ _id });
        },
        //ALL USERS
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('startbeins');
        },
        //USER BY USERNAME
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('startbeins');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;