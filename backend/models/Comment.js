// models/Comment.js

import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment
