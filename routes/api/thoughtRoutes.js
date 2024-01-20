const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Api route for GET 
router.route('/').get(getThought).post(createThought);

// Api route for GET/PUT/DELETE thought by ID
router.route('/thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// Api route for POST 
router.route('/:thoughtId/reactions').post(addReaction);

// Api route for DELETE 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export router
module.exports = router;