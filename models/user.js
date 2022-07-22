const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {

        username: { type: String, Unique: true, Required: true },
        email: { type: String, Unique: true, Required: true },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,

    }

);

userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    });

const User = model('User', userSchema);

const handleError = (err) => console.error(err);


User.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        User.insertMany(
            [{ username: "mArkymark", email: "marky@mark.com" }],
            (insertErr) => {
                if (insertErr) {
                    handleError(insertErr);
                }
            }
        );
    }
});


module.exports = User;

