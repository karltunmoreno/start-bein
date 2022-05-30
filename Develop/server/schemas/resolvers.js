//IMPORT
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
    }
};

module.exports = resolvers;