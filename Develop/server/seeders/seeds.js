//IMPORT FAKER TO AUTOMATICALLY SEED
const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});

    //CREATE USER DATA
    //CREATE USER DATA
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internt.email(username);
        const password = faker.internet.password();

        userData.push({ username, email, password });
    }

    const createdUsers = await User.collection.insertMany(userData);

    //FRIENDS
    for (let i = 0; i < 100; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        let friendId = userId;

        while (friendId === userId) {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
            friendId = createdUsers.ops[randomUserIndex];
        }

        await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    }

    //STARTS
    let createdStarts = [];
    for (let i = 0; i < 100; i += 1) {
        const startText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];

        const createdStart = await Start.create({ startText, username });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { starts: createdStart._id } }
        );

        createdStarts.push(createdStart);
    }

    //CONTRIBUTES
    for (let i = 0; i < 100; i += 1) {
        const contributeBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        const randomStartIndex = Math.floor(Math.random() * createdStarts.length);
        const { _id: startId } = createdStarts[randomStartIndex];

        await Start.updateOne(
            { _id: startId },
            { $push: { contributes: { reactionBody, username } } },
            { runValidators: true }
        );
    }

    console.log('all done!');
    process.exit(0);
});