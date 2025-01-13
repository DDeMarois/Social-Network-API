import { User } from '../../models/index';
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({
                message: 'No user found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({ username, email });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({
                message: 'No user found'
            });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            res.status(404).json({
                message: 'No user found'
            });
        }
        else {
            await User.deleteMany({ _id: { $in: user.friends } });
            res.json({ message: 'User deleted' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({
                message: 'No user found'
            });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteFriend = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } });
        if (!user) {
            res.status(404).json({
                message: 'No user found'
            });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
