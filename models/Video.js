const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VideoSchema = new Schema({
    videoId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Video = mongoose.model('video', VideoSchema);