//SEVERAL EXAMPLES ACROSS MODULES
//ONLY IMPORT WHAT YOU NEED FROM THE MONGOOSE LIBRARY
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const StartbeinSchema = new Schema(
    {

        startbeinName: {
            type: String,
            trim: true,
            required: 'A title is required!'
        },

        createdBy: {
            type: String,
            trim: true,
            required: 'An author is required'

            //username (The user that created this startbein)
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

        startbeinText: {
            type: String,
            trim: true,
            required: 'At least one word is required',
            minLength: 1,
            maxLength: 280

            //Required
            //Must be between 1 and 280 characters
        },
        keywords: [],


        contributes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'contribute'
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
StartbeinSchema.virtual('contributeCount').get(function () {
    return this.contributes.reduce((total, Contribute) => total + contribute.reactions.length + 1, 0);
});



//MAKE THE MODEL
const Startbein = model('Startbein', StartbeinSchema);
//EXPORT THE MODEL
module.exports = Startbein;