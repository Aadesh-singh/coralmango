const express = require('express');
const router = express.Router();

const { createReview, fetchAllReviewsOfRestaurants } = require('../controller/review');

router.post('/createReview', createReview);
router.get('/fetchAllReviewsOfRestaurants', fetchAllReviewsOfRestaurants);

module.exports = router;
