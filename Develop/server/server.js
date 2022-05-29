//SERVER TO DB SET-UP EXAMPLE FROM GOOGLEBOOKS-AND DEEP-THOUGHTS MERGED WITH BUDGET TRACKER
//HERE WE USE 2-PART STRUCTURE NEEDS A CONFIG DIRECTORY AND CONNECTION.JS FILE TO SEPARATE MONGOOSE
const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//ONE SERVER PROJECTS CAN PUT THEIR DB CONNECTION HERE W/O A CONFIG DIR
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/start-bein";

//SETTING UP MONGOOSE MOD 18 SHORT CIRCUIT TO mongodb://localhost:27017/pizza-hunt
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/start-bein', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//THIS IS FROM BUDGET-TRACKER
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// THIS IS IMPORTANT FOR THE CLIENT-SERVER SPLIT if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//THIS MAY HAVE TO BE REMOVED FOR NEW MIDDLEWARE ITS IN GOOGLEBOOKS-NOT DEEP-THOUGHTS
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

//LOG MONGO QUERIES EXECUTED-MOVED TO CONFIG CONNECTION - KEEP FOR 1 SERVER
mongoose.set('debug', true);

//FROM BUDGET-TRACKER REDUNDANT HERE BUT KEEP- MAY BE BETTER FOR 1 SERVER
app.listen(PORT, () => {
    console.log(`🌍 Connected on port ${PORT}!`);
});