const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: String,
        default: Date.now,
        set: (timestamps) => format_date(timestamps)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


thoughtSchema
    .virtual("reactionCount")
    // Getter
    .get(function () {
        return this.reactions.length;
    });


const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;