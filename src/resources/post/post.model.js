import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 70,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        maxlength: 250,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
        minlength: 20
    },
    number_of_likes: {
        type: Number,
        required: true,
        default: 1
    },
    users_that_liked: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    number_of_views: {
        type: Number,
        required: true,
        default: 0
    },
    user_id: {
        type: String,
        required: true,
    },
    user_details: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
});

export const Post = model('post', PostSchema);
