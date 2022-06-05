//ONLY IMPORT WHAT YOU NEED FROM THE MONGOOSE LIBRARY
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {

        thoughtName: {
            type: String,
            trim: true,
            required: 'A title is required!'
        },

        createdBy: {
            type: String,
            trim: true,
            required: 'An author is required'

            //username (The user that created this thought)
            //String
            //Required
        },

        createdAt: {
            type: Date,
            //Set default value to the current timestamp
            default: Date.now,
            //Use a getter method to format the timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        },

        thoughtText: {
            type: String,
            trim: true,
            required: 'At least one word is required',
            minLength: 1,
            maxLength: 280

            //Required
            //Must be between 1 and 280 characters
        },
        keywords: [],


        continues: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Continue'
            }
        ]

    },
    {
        toJSON: {
            virtuals: true,
            //ACTIVATE GETTERS FOR THE DATEFORMAT FUNCTIONALITY
            getters: true
        },
        //MONGOOSE RETURNS THIS VIRTUAL SO THE ID IS NA
        id: false
    }

);

//ADD VIRTUAL TO COUNT AND TRACK NUMBER OF CONTINUATIONS MADE ON RETRIEVAL
ThoughtSchema.virtual('continueCount').get(function () {
    return this.continues.reduce((total,Continue) => total + Continue.reactions.length + 1, 0);
});



//MAKE THE MODEL
const Thought = model('Thought', ThoughtSchema);
//EXPORT THE MODEL
module.exports = Thought;