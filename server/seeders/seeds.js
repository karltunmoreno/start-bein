//IMPORT FAKER TO AUTOMATICALLY SEED
const faker = require('faker');

const db = require('../config/connection');
const { Startbein, User } = require('../models');

db.once('open', async () => {
    await Startbein.deleteMany({});
    await User.deleteMany({});

    //CREATE USER DATA
    const userData = [];

    for (let i = 0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
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

    //STARTBEINS
    let createdStartbeins = [];
    for (let i = 0; i < 100; i += 1) {
        const startbeinText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];

        const createdStartbein = await Startbein.create({ startbeinText, username });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { startbeins: createdStartbein._id } }
        );

        createdStartbeins.push(createdStartbein);
    }

    //CONTRIBUTES
    for (let i = 0; i < 100; i += 1) {
        const contributeBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        const randomStartbeinIndex = Math.floor(Math.random() * createdStartbeins.length);
        const { _id: startbeinId } = createdStartbeins[randomStartbeinIndex];

        await Startbein.updateOne(
            { _id: startbeinId },
            { $push: { contributes: { contributeBody, username } } },
            { runValidators: true }
        );
    }

    console.log('all done!');
    process.exit(0);
});