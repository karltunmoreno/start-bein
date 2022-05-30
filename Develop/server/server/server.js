//IMPORT TO INITIALIZE MONGOOSE FOR MONGODB
const mongoose = require('mongoose');
const express = require('express');
const { db } = require('./models/Thought');
const res = require('express/lib/response');
const { User } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// EXPORTS TO THE .ENV DATABASE OR THE DEFAULT LOCALHOST - LOCAL MONGODB SERVER'S DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bein', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);


//CALL VIA THE EVENT LISTENER
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
