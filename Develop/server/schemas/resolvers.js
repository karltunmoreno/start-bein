//IMPORT
const { User, Contribute } = require('../models');

const resolvers = {
    Query: {
        contributes: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Contribute.find(params).sort({ createdAt: -1 });
        }
    }
};

module.exports = resolvers;