const express = require('express');
const {
    createRestaurants,
    fetchAllRestaurants,
    getDetailsOfRestaurants
} = require('../controller/restaurants')

const router = express.Router();

router.post('/createRestaurant', createRestaurants);
router.get('/fetchAllRestaurants', fetchAllRestaurants);
router.get('/getDetailsOfRestaurants', getDetailsOfRestaurants);

module.exports = router;