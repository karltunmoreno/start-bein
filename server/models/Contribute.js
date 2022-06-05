const { Schema } = require('mongoose');
//IMPORT FOR GETTER FUNCTIONALITY
const dateFormat = require('../utils/dateFormat');

//ADVISED TO USE DEEP THOUGHTS NOT VERT AS A TEMPLATE TO SIMPLIFY

const ContributeSchema = new Schema(
    {
        contributeBody: {
            type: String,
            required: true,
            // required: 'No time to be shy, this is required!',
            maxlength: 280
            // trim: true
        },

        username: {
            type: String,
            required: true
            // required: 'We need an author!',
            // trim: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = ContributeSchema;