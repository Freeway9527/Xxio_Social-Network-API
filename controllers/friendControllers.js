const User = require('../models/User');

module.exports = {
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            res.json(friend);  
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
},

async deleteFriend(req, res) {
    try {
        await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        res.json({ message: 'Friend Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
};