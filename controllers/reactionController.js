const Thought = require('../models/Thought');
const User = require('../models/User');


 // Create a new thought
 async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      if (!thought) {
        return res.status(404).json({
          message: "Cannot create thought, no user with the ID found.",
        });
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "Cannot create thought, no user with the ID found.",
        });
      }

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Could not update, User ID not found" });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },