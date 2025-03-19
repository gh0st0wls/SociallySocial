import { Router } from "express";
import { getUsers, createUser, getSingleUser, updateUser, deleteUser, createUserFriend, deleteUserFriend } from "../../controllers/userController.js";
const router = Router();
// localhost/api/users
router.route('/').get(getUsers).post(createUser);
// localhost/api/users/userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// localhost/api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(createUserFriend).delete(deleteUserFriend);
export default router;
