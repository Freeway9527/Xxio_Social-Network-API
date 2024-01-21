const Thought = require("../models/Thought");
const User = require("../models/User");

// Add a reaction
module.exports = {
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      res.json(reaction);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Remove a reaction
  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.status(200).json({ message: 'Reaction Deleted Successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
};
  


