const { Schema } = require('mongoose');

const hikeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    // comments: [
    //     {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Comment',
    //     },
    // ],
    });

module.exports = hikeSchema;