//IMPORT
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Startbein, Contribute } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('startbeins')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

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
        },

        addStartbein: async (parent, args, context) => {
            if (context.user) {
                const Startbein = await Startbein.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { startbeins: startbein._id } },
                    { new: true }
                );

                return Startbein;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addContribute: async (parent, { startbeinId, contributeBody }, context) => {
            if (context.user) {
                const updatedStartbein = await Startbein.findOneAndUpdate(
                    { _id: startbeinId },
                    { $push: { contributes: { contributeBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedStartbein;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }



};

module.exports = resolvers;


