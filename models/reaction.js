const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            Required: true,
            maxlength: 280,
            minlength: 1,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        username: {
            type: String,
            Required: true,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;