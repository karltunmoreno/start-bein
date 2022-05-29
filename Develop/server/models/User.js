//STATEMENT FOR IMPORT WHEN THE APP USES SOME SCHEMAS THAT WILL NOT BE FULL MODELS-CONSIDER IF TYPE IS NEEDED AS WELL
const { Schema, model } = require
//ENCRYPTION REQUIRED-SEE BELOW FOR MONGOOSE SET-UP CODE
const bcrypt = require('bcrypt');

//IMPORT THE PARTS NEEDED FROM THE MONGOOSE LIB
const { Schema, model, Types } = require('mongoose');

//UNIQUE VALIDATOR FROM https://www.codegrepper.com/code-examples/javascript/mongoose+required+unique+validator
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var mySchema = mongoose.Schema(/* put your schema definition here */);
mySchema.plugin(uniqueValidator);

//EMAIL VALIDATOR STATEMENTS FROM https://www.codegrepper.com/code-examples/whatever/mongoose+validate+match+regex
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//USER SCHEMA
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: "A Name is required",
            unique: true,
            trim: true

        },
        email: {
            type: String,
            required: 'A valid email address is required',
            unique: true,
            // FROM https://www.codegrepper.com/code-examples/whatever/mongoose+validate+match+regex
            validate: [validateEmail, 'Please fill-in a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill-in a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: 4
        },
        //THIS IS SIMILAR TO 'PIZZA' IN 'PIZZA HUNT'
        starts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Start'
            }
        ],
        //THIS IS SIMILAR TO 'COMMENTS' IN 'PIZZA HUNT'
        contributes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contribute'
            }
        ],
        //THIS IS NEW TO MAKE OUR OWN "CURRENCY" OR POINTS BASED ON USER INTERACTION-CHILD TO USER
        savedBeins: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        //CHECK IF WE NEED GETTERS
        toJSON: {
            virtuals: true
        },
        //MONGOOSE RETURNS THIS VIRTUAL SO THE ID IS NA
        id: false
    }

);

//HASH USER PASSWORD
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//METHOD TO COMPARE AND VALIDATE INCOMING PASSWORD WITH THE HASHED PASSWORD TO LOGIN
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//QUERY A USER AND RECEIVE COUNTS FOR OUR SCHEMAS THAT ARE VIRTUALS - 

//BEINS ARE BASED ON GOOGLEBOOKS USER MODEL FOR BOOK SCHEMA - SAVEDBOOKS=SAVED BEINS- SO ANY SAVED RESOURCES FROM VOLUNTEER GROUPS OR ORG TO DONATE WOULD MAKE A BEIN COUNT? - OR IT COULD BE BASED ON OTHER USER REACTIONS TO OUR STARTS AND CONTRIBUTIONS
userSchema.virtual('beinCount').get(function () {
    return this.savedBeins.length;
});

//FRIENDS - TYPICAL
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//ADD VIRTUAL TO COUNT AND TRACK NUMBER OF STARTS AND LINKED CONTRIBUTES MADE ON RETRIEVAL TEST
UserSchema.virtual('startCount').get(function () {
    return this.starts.reduce((total, thought) => total + start.contributes.length + 1, 0);
});

//MAKE THE MODEL
const User = model('User', userSchema);
//EXPORT
module.exports = User;

