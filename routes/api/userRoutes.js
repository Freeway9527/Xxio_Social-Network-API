const router = require("express").Router();

// Import controllers functions
const {
  getUsers,
  getSingleUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../../controllers/userController");

const { addFriend, deleteFriend } = require("../../controllers/userController");

// Api route for GET users
router.route('/').get(getUsers).post(createUsers);

// Api route for GET/PUT/DELETE user by ID
router
  .route('/:usersId')
  .get(getSingleUsers)
  .put(updateUsers)
  .delete(deleteUsers);

// Api route for friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// Export router
module.exports = router;
