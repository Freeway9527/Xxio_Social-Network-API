const User = require("./User");

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

async removeFriend(req, res) {
    try {
        const friend = await User.findOneAndRemove({ _id: req.params.friendId });

        if (!friend) {
            return res.status(404).json({ message: 'Friend does not exist with that ID' });
        }

        res.status(200).json({ message: 'Friend Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
};