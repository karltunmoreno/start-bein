//IMPORT FAKER TO AUTOMATICALLY SEED
const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});



})