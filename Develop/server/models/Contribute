const { Schema, model, Types } = require('mongoose');
//IMPORT FOR GETTER FUNCTIONALITY
const dateFormat = require('../utils/dateFormat');

//reactions (These are like replies)
//Array of nested documents created with the reactionSchema
const ReactionSchema = new Schema(
    {
        //CUSTOM ID TO DIFFERENTIATE FROM UNIVERSAL PARENT CONTRIBUTE ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'No time to be shy, this is required!',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'We need an author!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ContributeSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: 'We need an author!',
            trim: true
        },
        contributeBody: {
            type: String,
            required: 'No time to be shy, this is required!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

//ADD VIRTUAL TO COUNT THE NUMBER OF REACTIONS ON RETRIEVAL
ContributeSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//MAKE THE MODEL
const Contribute = model('Contribute', ContributeSchema);

module.exports = Contribute;