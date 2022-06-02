//THIS EXAMPLE IS FROM GOOGLEBOOKS-IT DOES KEEP THE SERVER.JS FILE AND THE MONGOOSE LOGIC SEPARATE AND CLEAN...

const mongoose = require('mongoose');

//LOG MONGO QUERIES EXECUTED-THIS IS FROM BUDGET TRACKER
mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/start-bein', {
    /** useNewUrlParser false by default. Set to `true` to make all connections set the `useUnifiedTopology` option by default */
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    /** Set use FindAndModify to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
    useFindAndModify: false,
});

module.exports = mongoose.connection;
