const router = require('express').Router();
const { getUser, getUsers, createUser, updateUser, deleteUser} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userID').get(getUser).put(updateUser).delete(deleteUser);


module.exports = router;