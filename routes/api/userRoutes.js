const router = require("express").Router();

// Import controllers functions
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userControllers');

const { 
    addFriend, 
    deleteFriend 
} = require('../../controllers/friendControllers');

// Api route for GET users
router.route('/').get(getUser).post(createUser);

// Api route for GET/PUT/DELETE user by ID
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// Api route for friends
router.route('/:userId/friend/:friendId').post(addFriend).delete(deleteFriend);

// Export router
module.exports = router;
