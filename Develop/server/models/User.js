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
        starts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Start'
            }
        ],
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
        toJSON: {
            virtuals: true
        }
    }

);