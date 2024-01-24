const User = require('../models/User');

module.exports = {
    // Add friend to the user's friend list
    async addFriend(req, res) {
        try {
            // Find user by ID and add the friend to the friend list
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            // Return the updated information
            res.json(friend);  
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
},

// Delete friend from the user's friend list
async deleteFriend(req, res) {
    try {
        // Find the user by ID and delete the friend from the friend list
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        // Return the updated information
        res.json({ message: 'Friend Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
};