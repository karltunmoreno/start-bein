//IMPORT FAKER TO AUTOMATICALLY SEED
const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});

    //CREATE USER DATA
        //CREATE USER DATA
        const userData = [];

        for (let i = 0; i < 50; i +=1) {
            const username = faker.internet.userName();
            const email = faker.internt.email(username);
            const password = faker.internet.password();
    
            userData.push({ username, email, password });
        }
    
        const createdUsers = await User.collection.insertMany(userData);
    
})