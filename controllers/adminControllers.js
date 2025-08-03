const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { sendTokenResponse } = require('../utils/auth');


// Create user
exports.createUser = async (req, res) => {
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

// Delete user
exports.deleteUser = async (req, res) => {
    const { email } = req.body;
    try {
        await User.destroy({ where: { email } });
        res.status(200).json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const { name, email, password, organization, phoneNum, role } = req.body;
    try {
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.name = name;
        user.email = email;
        user.organization = organization;
        user.phoneNum = phoneNum;
        user.role = role;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(200).json({ msg: 'User updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user by ID
exports.getUserByEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
