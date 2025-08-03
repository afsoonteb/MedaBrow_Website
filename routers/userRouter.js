const express = require('express');
const { verifyToken, verifyUser } = require('../middlewares/verifyToken');


const router = express.Router();

router.get('/dashboard', verifyToken, verifyUser, (req, res) => {
    res.send('Welcome to the dashboard');
});

module.exports = router;