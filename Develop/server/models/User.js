//STATEMENT FOR IMPORT WHEN THE APP USES SOME SCHEMAS THAT WILL NOT BE FULL MODELS-CONSIDER IF TYPE IS NEEDED AS WELL
const { Schema, model } = require
//ENCRYPTION REQUIRED-SEE BELOW FOR MONGOOSE SET-UP CODE
const bcrypt = require('bcrypt');

//USER SCHEMA
const userSchema = new Schema(
    {
        username: {

        },
        email: {

        },
        password: {

        },
        //THIS IS SIMILAR TO 'PIZZA' IN 'PIZZA HUNT'
        starts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Start'
            }
        ],
        //THIS IS SIMILAR TO 'COMMENTS' IN 'PIZZA HUNT'
        contributions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contribute'
            }
        ],
        //THIS IS NEW TO MAKE OUR OWN "CURRENCY" OR POINTS 
        beins: [
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
        }
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
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

//QUERY A USER AND RECEIVE COUNTS FOR OUR SCHEMAS THAT ARE VIRTUALS - 

//BEINS ARE BASED ON GOOGLEBOOKS USER MODEL FOR BOOK SCHEMA - SAVEDBOOKS=SAVED BEINS- SO ANY SAVED RESOURCES FROM VOLUNTEER GROUPS OR ORG TO DONATE WOULD MAKE A BEIN COUNT? - OR IT COULD BE BASED ON OTHER USER REACTIONS TO OUR STARTS AND CONTRIBUTIONS
userSchema.virtual('beinCount').get(function () {
    return this.savedBeins.length;
});

//FRIENDS - TYPICAL
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//EXPORT STATEMENTS
const User = model('User', userSchema);

module.exports = User;

