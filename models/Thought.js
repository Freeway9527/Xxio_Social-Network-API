const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

// Define the thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        // Embed reactions in the thought model
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Calculate the number of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Export the Thought model
module.exports = Thought;

