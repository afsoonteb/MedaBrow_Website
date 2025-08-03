const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { sendTokenResponse } = require('../utils/auth');


// Sign up
exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, organization, phoneNum, role } = req.body;
    try {
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = await User.create({
            name,
            email,
            password,
            organization,
            phoneNum,
            role
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ msg: 'User created' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Log in
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};