const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  // Get all users
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Get user by ID
  async getSingleUser(req, res) {
    try {
      // Find a user by ID and populate information
      const dbUser = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!dbUser) {
        return res
          .status(404)
          .json({ message: "No user was found with that ID!" });
      }

      res.json(dbUser);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with this id to update on" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      // Delete all thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res.json({ message: "User Deleted Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
};
