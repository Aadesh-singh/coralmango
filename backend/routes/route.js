const express = require('express');

const router = express.Router();



router.use('/user', require('./user'))
router.use('/review', require('./review'))
router.use('/restaurants', require('./restaurants'))



module.exports = router;