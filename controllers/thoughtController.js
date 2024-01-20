const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get single thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

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

  // Delete thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Delete unsucessful, User ID not found" });
      }

      res.status(200).json({ message: "Thought sucessfully deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

// export the module
module.exports = thoughtController;
