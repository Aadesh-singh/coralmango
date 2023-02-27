const mongoose = require('mongoose');

const restaurantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    foods: [String],
    address: {
        type: String,
        required: true
    },
    imageUrl: String,
});

const Restaurants = mongoose.model('Restaurants', restaurantsSchema);

module.exports = Restaurants;