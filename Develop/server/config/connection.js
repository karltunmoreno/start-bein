//THIS EXAMPLE IS FROM GOOGLEBOOKS-IT DOES KEEP THE SERVER.JS FILE AND THE MONGOOSE LOGIC SEPARATE AND CLEAN...

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

module.exports = mongoose.connection;
