import User from "../models/userModels.js";
import Thoughts from "../models/thoughtModel.js";
// get all users
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).json({ message: "No User Found !!" });
            return;
        }
        res.status(200).json(users);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// get a single user by id
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select("-__v")
            .populate("friends")
            .populate("thoughts");
        // if user is not found
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// create users
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        if (!user) {
            res.status(404).json({ message: "No User Created" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// update a single user by id
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        });
        // if user is not found
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// delete a single user by id
//x todo delete all the thougths when user is deleted
export const deleteUser = async (req, res) => {
    try {
        // check if user exist's
        const user = await User.findById(req.params.userId);
        // if user is not found
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        // deleting all the thoughts associated with user before deleting user from db
        await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
        // deleting user by id
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: "User Deleted." });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// create a user's friend
export const createUserFriend = async (req, res) => {
    try {
        // checking if the friend we are trying to add exists or not!!
        const friend = await User.findById(req.params.friendId);
        // if friend does not exist
        if (!friend) {
            res.status(404).json({ message: "Friend not found" });
            return;
        }
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        // if user does not exist
        if (!user) {
            res.status(404).json({ message: "User does not exist" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
// delete a user's friend
export const deleteUserFriend = async (req, res) => {
    try {
        // checking if the friend we are trying to delete exists or not!!
        const friend = await User.findById(req.params.friendId);
        // if the friend exist we proceed with finding the user and removing the friend
        if (!friend) {
            res.status(404).json({ message: "friend not found" });
            return;
        }
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $pull: { friends: req.params.friendId },
        });
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json({ message: "Friend Deleted!" });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
