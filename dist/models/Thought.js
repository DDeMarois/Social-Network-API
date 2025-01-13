import { Schema, model } from 'mongoose';
import Reaction from './Reaction';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    reactions: [Reaction],
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('thought', thoughtSchema);
export default Thought;
