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


// const FriendSchema = new Schema({
//     friendId: {
//         type: Schema.Types.ObjectId,
//         default: () => new Types.ObjectId(),
//         ref: 'User'
//     },

//     friendName: {
//         type: String,
//         required: 'We need to know the name of your friend!',
//         unique: true,
//         validate: [/A-Za-z/, 'Please enter a name']
//     },
// });

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'A Name is Required',
            trim: true
        },

        email: {
            type: String,
            trim: true,
            required: 'A valid email address is required',
            unique: true,
            //REGEX FROM ADRIAN BIENAS https://stackoverflow.com/users/9158604/adrian-bienias
            // match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please enter a valid e-mail address']
            // FROM https://www.codegrepper.com/code-examples/whatever/mongoose+validate+match+regex
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },


        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        continues: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Continue'
            }
        ],
        // friends: [FriendSchema]
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,

        },
        //MONGOOSE RETURNS THIS VIRTUAL SO THE ID IS NA
        id: false
    }
);

//ADD VIRTUAL TO COUNT THE NUMBER OF COMMENTS ON RETRIEVAL-THIS DIDN'T WORK EXACTLY I ADDED A "+1"-ADDED TO ALL USERS' FRIEND COUNT
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//ADD VIRTUAL TO COUNT AND TRACK NUMBER OF FRIENDS MADE ON RETRIEVAL-DOESN'T WORK
// UserSchema.virtual('friendCount').get(function () {
//     return this.friends.reduce((total, friend) => total + this.friends.length + 1, 0);
// });

//ADD VIRTUAL TO COUNT AND TRACK NUMBER OF THOUGHTS AND THOUGHTS WITH CONTINUES MADE ON RETRIEVAL TEST
UserSchema.virtual('thoughtCount').get(function () {
    return this.thoughts.reduce((total, thought) => total + thought.continues.length + 1, 0);
});

//ADD VIRTUAL TO COUNT AND TRACK NUMBER OF CONTINUES AND CONTINUES WITH REACTIONS MADE ON RETRIEVAL TEST
UserSchema.virtual('continueCount').get(function () {
    return this.continues.reduce((total, Continue) => total + Continue.reactions.length + 1, 0);
});

//MAKE THE MODEL
const User = model('User', UserSchema);
//EXPORT THE MODEL
module.exports = User;
