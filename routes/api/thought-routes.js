const { Thought, Reaction } = require("../models");
const User = require("../models/User.js");


router.get("/", async (req, res) => {
    try {
        const thoughtData = await Thought.find({});
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({});
        res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/", async (req, res) => {
    try {
        const newThought = new Thought({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        });
        newThought.save();
        if (newThought) {
            res.status(200).json(newThought);
        } else {
            console.log("Something went wrong");
            res.status(404).json({ message: "Something went wrong" });
        }
    } catch (err) {
        res.status(500).json(err);
    }

    router.post("/:thoughtId/reactions", async (req, res) => {
        try {
            const currentThought = await Thought.findOne({
                _id: new ObjectId(req.params.thoughtId),
            });
            currentThought.reactions.push(req.body);
            await currentThought.save();
            if (currentThought) {
                res.status(200).json(currentThought);
            } else {
                console.log("Something went wrong");
                res.status(400).json({ message: "Something went wrong" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });


    router.put("/:id", async (req, res) => {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (updateThought) {
                res.status(200).json(updateThought);
            } else {
                res.status(404).json({ message: "Was not able to update thought" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    });

    router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            await deleteReaction.save();
            if (deleteReaction) {
                res.status(200).json(deleteReaction);
            } else {
                res.status(400).json({ message: "Could not delete reaction." });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    });


    router.delete("/:id", async (req, res) => {
        try {
            const deleteThought = await Thought.deleteOne({ _id: req.params.id });
            res.status(200).json(deleteThought);
        } catch (err) {
            res.status(500);
        }
    });

    module.exports = router;