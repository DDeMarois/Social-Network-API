import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            default: []
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
userSchema.virtual('friendCount').get(function () {
    return this.friends ? this.friends.length : 0;
});
userSchema.index({ username: 1, email: 1 });
const User = model('User', userSchema);
export default User;
