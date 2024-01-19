const {User, Thought} = require('../models');

module.exports = {
    async getThought(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}, 

async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.status(200).json(thought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},






