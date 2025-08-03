const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const e = require('express');


exports.verifyToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: payload.user.id } });
        if (!user) {
            return res.status(401).send('Access Denied');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

exports.verifyUser = async (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(401).send('Access Denied');
    }
    next();
};

exports.verifyAdmin = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).send('Access Denied');
    }
    next();
};
