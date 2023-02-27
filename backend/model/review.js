const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants'
    }
});

const ReviewSchema = mongoose.model('Review', reviewSchema);

module.exports = ReviewSchema;