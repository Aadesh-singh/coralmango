const express = require('express');
const router = express.Router();

const {
    createUser,
    fetchAllUser,
    userLogin
} = require('../controller/user')

router.post('/createUser', createUser);
router.post('/userLogin', userLogin);
router.get('/fetchAllUser', fetchAllUser);


module.exports = router;