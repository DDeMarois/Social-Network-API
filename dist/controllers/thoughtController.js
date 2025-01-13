import { Thought } from '../models/index';
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'No thought found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const createThought = async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({ thoughtText, username });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({
                message: 'No thought found'
            });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
