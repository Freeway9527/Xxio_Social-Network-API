const Thought = require("../models/Thought");
const User = require("../models/User");

// Add a reaction
module.exports = {
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      res.json(reaction);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove a reaction
  async removeReaction(req, res) {
    try {
      await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      res.json(200), json({ message: "Reaction deleted Successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

// export the module 
module.exports = reactionController;
